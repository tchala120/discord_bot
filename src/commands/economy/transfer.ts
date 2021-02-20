import { Message } from 'discord.js'
import {
  addNewUserToDB,
  getCoin,
  isInsufficientFunds,
  isUserExist,
  Profile,
  transferBalance,
  retreiveProfileDB,
} from '../../../src/utils/user'

export const execute = async (message: Message, args: string[]): Promise<Message> => {
  const amount = getCoin(args)
  const to: any = message.mentions.users.first()
  const from = message.author

  let profiles: Profile[] = retreiveProfileDB()

  if (!isUserExist(to.id, profiles)) addNewUserToDB(to.id, to.tag, 0, profiles)

  if (isInsufficientFunds(from, amount, profiles)) return message.reply('คุณมีเงินไม่เพียงสำหรับการทำธุรกรรม.')

  transferBalance(to, from, amount, retreiveProfileDB())

  return message.channel.send(`โอนเหรียญให้กับ <@${to.id}> เป็นจำนวน ${amount} tcoin.`)
}

export const name: string = 'transfer'
export const description: string = 'คำสั่งโอนเหรียญของเราให้กับคนอื่น ถ้าเงินไม่เพียงพอไม่สามารถโอนได้'
export const cooldown: number = 10
export const icon: string = '🤲'
export const args = true
export const usage = '<user> <amount>'
