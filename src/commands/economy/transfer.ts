import { Message } from 'discord.js'
import path from 'path'
import {
  addNewUserToDB,
  isInsufficientFunds,
  isUserExist,
  Profile,
  retreiveProfileDB,
  transferBalance,
} from '../../../src/utils/user'

export const execute = async (message: Message, args: string[]): Promise<Message> => {
  const amount = Number(args[args.length - 1])
  const to = message.mentions.users.first()
  const from = message.author

  const dbPath = path.join(__dirname, '../../../', 'database/profiles.json')

  let profiles: Profile[] = retreiveProfileDB(dbPath)

  if (!isUserExist(to.id, profiles)) addNewUserToDB(to.id, to.tag, 0, dbPath, profiles)

  if (isInsufficientFunds(from, amount, profiles)) return message.reply('คุณมีเงินไม่เพียงสำหรับการทำธุรกรรม.')

  transferBalance(to, from, amount, dbPath, profiles)

  return message.channel.send(`โอนเหรียญให้กับ <@${to.id}> เป็นจำนวน ${amount} tcoin.`)
}

export const name: string = 'transfer'
export const description: string = 'คำสั่งโอนเหรียญของเราให้กับคนอื่น ถ้าเงินไม่เพียงพอไม่สามารถโอนได้'
export const cooldown: number = 10
export const icon: string = '🤲'
export const args = true
export const usage = '<user> <amount>'
