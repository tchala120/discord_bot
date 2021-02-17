import fs from 'fs'
import { Client, Collection, Message } from 'discord.js'
import { TOKEN, PREFIX } from './config'
import { ICommand } from './commands'

export class Bot {
  private _client!: Client

  private _commands!: Collection<string, ICommand>

  private _cooldowns!: Collection<string, Collection<string, number>>

  public constructor() {
    this._client = new Client()
  }

  public async start(): Promise<void> {
    this.init()
    this._commands = this.setCommand()
    this._cooldowns = new Collection<string, Collection<string, number>>()
    await this.listen()
  }

  private async listen(): Promise<void | Message> {
    this._client.on('message', (message: Message): void | Promise<Message> => {
      if (!message.content.startsWith('!') || message.author.bot) return

      const args = message.content.substring(PREFIX.length).trim().split(' ')
      const commandName: string = args.shift()?.toLowerCase() || ''

      const command =
        this._commands.get(commandName) ||
        this._commands.find((cmd) => (cmd.aliases ? cmd.aliases.includes(commandName) : false))

      if (!command) return message.reply('ไม่เจอคำสั่ง, โปรดรัน `!help` เพื่อแสดงคำสั่งทั้งหมด.')

      try {
        this.commandHandler(command, message, args)
      } catch (error) {
        console.error(error)
        message.reply('เกิดข้อผิดพลาดระหว่างการรันคำสั่ง โปรดเช็ค log เพื่อดู error')
      }
    })
    await this._client.login(TOKEN)
  }

  private init(): void {
    this._client.once('ready', () => {
      console.log('บอท Tconomy ได้ออนไลน์แล้ว')
    })
  }

  private setCommand(): Collection<string, ICommand> {
    const commands: Collection<string, ICommand> = new Collection()
    const tsExtensionFile = (file: string) => file.endsWith('.ts')

    const commandFolders = fs.readdirSync('./src/commands').filter((file) => !tsExtensionFile(file))

    try {
      for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => tsExtensionFile(file))
        for (const file of commandFiles) {
          const command: ICommand = require(`./commands/${folder}/${file}`)
          commands.set(command.name, command)
        }
      }
    } catch (e) {
      console.log('เกิดข้อผิดพลาดระหว่างการโหลดคำสั่ง', e)
    }

    return commands
  }

  private commandHandler(command: ICommand, message: Message, args: string[]): Promise<Message> | void {
    //#region Check guild only command.
    if (command.guildOnly && message.channel.type === 'dm') return message.reply('ฉันไม่สามารถทำงานใน dm ได้')
    //#endregion

    //#region Args handler
    if (command.args) {
      if (args.length === 0)
        return message.reply(
          `คุณไม่ได้ส่ง argument มา, โปรดลอง \`\`\`${PREFIX}${command.name} ${command.usage} ${this.splitAliasesCommand(
            command
          )}\`\`\``
        )
    }
    //#endregion

    //#region Cooldown for prevent flood command.
    if (!this._cooldowns.has(command.name)) {
      this._cooldowns.set(command.name, new Collection<string, number>())
    }

    const now = Date.now()
    const timestamps = this._cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000

    if (timestamps?.has(message.author.id)) {
      const expirationTime = (timestamps.get(message.author.id) || now) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return message.reply(`กรุณารอ ${timeLeft.toFixed(1)} วินาที. ก่อนจะใช้คำสั่ง \`${command.name}\` อีกครั้ง.`)
      }
    } else {
      timestamps?.set(message.author.id, now)
      setTimeout(() => timestamps?.delete(message.author.id), cooldownAmount)
    }
    //#endregion

    //#region Role Handler
    if (command.roles && !message.member.roles.some((role) => command.roles.includes(role.id)))
      return message.reply('คุณไม่สามารถใช้คำสั่งนี้ได้ เนื่องจากสิทธิ์ไม่เพียงพอ.')
    //#endregion

    //#region Permission Handler
    if (command.permissions && !message.member.permissions.has(command.permissions)) {
      return message.reply('คุณไม่มี permissions เพียงพอ, ไม่สามารถใช้งานคำสั่งได้')
    }
    //#endregion

    command.execute(message, args, this._commands)
  }

  private splitAliasesCommand(command: ICommand): string {
    const { aliases } = command
    let usage = ''
    if (aliases)
      aliases.map((alias, index) => (usage += `| ${alias} ${command.usage}${index < aliases.length - 1 ? ' ' : ''}`))
    return usage
  }
}

export default Bot
