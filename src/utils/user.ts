import { User } from 'discord.js'
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(__dirname, '../../', 'database/profiles.json')
export interface Profile {
  id: string
  tag: string
  balance: number
}

export function isUserExist(id: string | undefined, profiles: Profile[]): boolean {
  if (profiles.length === 0) return false
  return profiles.some((p: Profile) => p.id === id)
}

export function findProfileById(id: string, profiles: Profile[]): Profile | undefined {
  return profiles.find((p: Profile) => p.id === id)
}

export function saveProfilesData(data: string) {
  fs.writeFileSync(DB_PATH, data)
}

export function addNewUserToDB(id: string, tag: string, balance: number, profiles: Profile[]) {
  const newUser: Profile = { id, tag, balance }
  const data = toString([...profiles, newUser])
  saveProfilesData(data)
}

export function retreiveProfileDB(): Profile[] {
  const raw = fs.readFileSync(DB_PATH, {
    encoding: 'utf-8',
  })
  return JSON.parse(raw).profiles
}

export function transferBalance(to: User, from: User, amount: number, profiles: Profile[]) {
  profiles = profiles.map((p) => {
    console.log('Transfering...', p.id, to.id, from.id)
    if (p.id !== to.id && p.id !== from.id) return { ...p }
    else if (p.id === to.id) return { ...p, balance: p.balance + amount }
    else return { ...p, balance: p.balance - amount }
  })
  saveProfilesData(toString(profiles))
}

export function isInsufficientFunds(from: User, amount: number, profiles: Profile[]): boolean {
  let isInsufficient = false

  profiles.map((p) => {
    if (p.id === from.id) {
      isInsufficient = p.balance < amount
    }
  })

  return isInsufficient
}

export function toString(profiles: Profile[]): string {
  return JSON.stringify({
    profiles,
  })
}

export function getCoin(args: string[]): number {
  let coin

  if (args.length > 1)
    args.map((arg) => {
      if (!arg.includes('<@!')) coin = arg
      else return
    })

  return Number(coin)
}
