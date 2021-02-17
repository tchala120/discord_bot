import { Collection, Message } from 'discord.js'
import { ICommand } from '..'

export const execute = async (
  message: Message,
  args: string[],
  commands: Collection<string, ICommand>
): Promise<Message> => {
  const data: string[] = []
  const myRoles = message.member.roles

  console.log('args', args)

  data.push('📚\t**คำสั่ง Help**\n')
  data.push(
    commands
      .map((command) => {
        if (command.roles && command.roles.length > 0 && !myRoles.some((role) => command.roles?.includes(role.id)))
          return ``
        return `- \`${command.name}\` -->\t${command.description}\n\n`
      })
      .join('')
  )

  return message.channel.send(data)
}

export const name: string = 'help'
export const description: string = 'คำสั่งในการช่วยเหลือ เกี่ยวกับ "บอท".'
export const aliases: string[] = ['?']
export const cooldown: number = 10
export const icon: string = '📚'
