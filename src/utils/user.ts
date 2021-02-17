import { User } from 'discord.js'
import fs from 'fs'

export interface Profile {
  id: string
  tag: string
  balance: number
}

export function isUserExist(id: string, profiles: Profile[]): boolean {
  if (profiles.length === 0) return false
  return profiles.some((p: Profile) => p.id === id)
}

export function findProfileById(id: string, profiles: Profile[]): Profile | undefined {
  return profiles.find((p: Profile) => p.id === id)
}

export function saveProfilesData(dbPath: string, data: string) {
  fs.writeFileSync(dbPath, data)
}

export function addNewUserToDB(id: string, tag: string, balance: number, dbPath: string, profiles: Profile[]) {
  const newUser: Profile = { id, tag, balance }
  const data = toString([...profiles, newUser])
  saveProfilesData(dbPath, data)
}

export function retreiveProfileDB(dbPath: string): Profile[] {
  const raw = fs.readFileSync(dbPath, {
    encoding: 'utf-8',
  })
  return JSON.parse(raw).profiles
}

export function transferBalance(to: User, from: User, amount: number, dbPath: string, profiles: Profile[]) {
  profiles = profiles.map((p) => {
    if (p.id !== to.id && p.id !== from.id) return { ...p }
    else if (p.id === to.id) return { ...p, balance: p.balance + amount }
    else return { ...p, balance: p.balance - amount }
  })
  saveProfilesData(dbPath, toString(profiles))
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
