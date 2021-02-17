import { Message } from 'discord.js'
import path from 'path'
import { addNewUserToDB, findProfileById, isUserExist, Profile, retreiveProfileDB } from '../../../src/utils/user'

export const execute = async (message: Message): Promise<Message> => {
  const authorId = message.author.id
  const dbPath = path.join(__dirname, '../../../', 'database/profiles.json')

  const profiles: Profile[] = retreiveProfileDB(dbPath)

  if (!isUserExist(authorId, profiles)) addNewUserToDB(authorId, message.author.tag, 0, dbPath, profiles)
  const coins = !isUserExist(authorId, profiles) ? 0 : findProfileById(authorId, profiles)?.balance

  return message.reply(`เงินของคุณมี ${coins} tcoin.`)
}

export const name: string = 'balance'
export const description: string = 'คำสั่งแสดงเงินคงเหลือ'
export const aliases: string[] = ['bal']
export const cooldown: number = 10
export const icon: string = '🪙'
