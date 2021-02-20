import { BitFieldResolvable, Message, PermissionString } from 'discord.js'
import { ROLES } from 'src/config'

export const execute = async (message: Message, args: string[]): Promise<void> => {
  const amount: number = parseInt(args[0])
  const messageLists = await message.channel.fetchMessages({
    limit: amount,
  })
  message.channel.bulkDelete(messageLists)
}

export const name: string = 'clearchat'
export const description: string = 'คำสั่งสำหรับลบข้อความทั้งหมด'
export const icon: string = '💬'
export const roles: string[] = [ROLES.OWNER]
export const permissions: BitFieldResolvable<PermissionString> = ['MANAGE_MESSAGES']
