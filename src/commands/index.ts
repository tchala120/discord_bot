import { BitFieldResolvable, Collection, Message, PermissionString } from 'discord.js'

export interface ICommand {
  name: string
  description: string
  aliases: string[]
  args: boolean
  guildOnly: boolean
  usage: string
  cooldown: number
  icon: string
  permissions: BitFieldResolvable<PermissionString>
  roles: string[]
  execute(message: Message, args?: any[], commands?: Collection<string, ICommand>): Promise<Message> | void
}
