import { Message } from 'discord.js'
import { addNewUserToDB, findProfileById, isUserExist, Profile, retreiveProfileDB } from '../../../src/utils/user'

export const execute = async (message: Message): Promise<Message> => {
  const authorId = message.author.id

  const profiles: Profile[] = retreiveProfileDB()

  if (!isUserExist(authorId, profiles)) addNewUserToDB(authorId, message.author.tag, 0, profiles)
  const coins = !isUserExist(authorId, profiles) ? 0 : findProfileById(authorId, profiles)?.balance

  return message.reply(`เงินของคุณมี ${coins} tcoin.`)
}

export const name: string = 'balance'
export const description: string = 'คำสั่งแสดงเงินคงเหลือ'
export const aliases: string[] = ['bal']
export const cooldown: number = 10
export const icon: string = '🪙'
