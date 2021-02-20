import { config } from 'dotenv'

config()

export const TOKEN = process.env.BOT_TOKEN

export const PREFIX = '!'

export const CHANNELS = {
  ECONOMY: '811571385649594429',
  RULE: '811421236747436033',
  WELCOME: '812080895136759808',
}

export const ROLES = {
  OWNER: '810852554358390814',
}
