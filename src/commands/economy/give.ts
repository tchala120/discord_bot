import { BitFieldResolvable, Message, PermissionString } from 'discord.js'
import {
  addNewUserToDB,
  isUserExist,
  Profile,
  retreiveProfileDB,
  saveProfilesData,
  toString,
} from '../../../src/utils/user'

export const execute = async (message: Message, args: string[]): Promise<Message> => {
  const amount = Number(args[args.length - 1])
  const target = message.mentions.users.first() || message.author

  let profiles: Profile[] = retreiveProfileDB()

  if (!isUserExist(target.id, profiles)) addNewUserToDB(target.id, target.tag, amount, profiles)
  else {
    profiles = profiles.map((p) => ({ ...p, balance: p.id === target.id ? p.balance + amount : p.balance }))
    saveProfilesData(toString(profiles))
  }

  return message.channel.send(`มอบเหรียญให้กับ <@${target.id}> เป็นจำนวน ${amount} tcoin.`)
}

export const name: string = 'give'
export const description: string = 'คำสั่งมอบเหรียญให้ user โดยคนที่ให้ต้องเป็น admin เท่านั้น'
export const cooldown: number = 10
export const icon: string = '🤲'
export const permissions: BitFieldResolvable<PermissionString> = ['ADMINISTRATOR']
export const roles: string[] = ['810852554358390814']
export const args = true
export const usage = '<user> <amount>'
