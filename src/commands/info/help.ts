import { Collection, Message } from 'discord.js'
import { ICommand } from '..'

export const execute = async (
  message: Message,
  args: any[],
  commands: Collection<string, ICommand>
): Promise<Message> => {
  const data: string[] = []

  console.log('args', args, 'commands', commands)

  data.push('📚\t**คำสั่ง Help**\n')
  data.push(commands.map((command) => `- \`${command.name}\` -->\t${command.description}\n`).join('\n'))

  return message.channel.send(data)
}

export const name: string = 'help'
export const description: string = 'คำสั่งในการช่วยเหลือ เกี่ยวกับ "บอท" Tconomy.'
export const aliases: string[] = ['?']
export const cooldown: number = 10
export const icon: string = '📚'
