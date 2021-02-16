import Discord, { Client, Collection, Message } from 'discord.js'
import fs from 'fs'

export interface Command {
  name: string
  description: string
  execute(message: Message, args?: any[]): void
}

const client: Client = new Discord.Client()

const PREFIX = '!'

const commands: Collection<string, Command> = new Collection()

const commandFiles = fs.readdirSync('./src/commands/').filter((f) => f.endsWith('.ts'))
for (const file of commandFiles) {
  const command: Command = require(`./src/commands/${file}`)

  commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('TCoin is online!')
})

client.on('message', (message: Message) => {
  if (message.content.startsWith('!')) {
    const args = message.content.substr(PREFIX.length).split(/ +/) || []
    const command = args.shift()?.toLowerCase()

    if (command === 'ping') {
      commands.get('ping')?.execute(message, args)
    }
  }
})

client.login('ODExMjg1MTg2OTk3OTExNTYy.YCv-NQ.ixJCHsnXnbbEi6uO3eEJWmM4nGI')
