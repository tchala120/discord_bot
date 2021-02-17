import { config } from 'dotenv'

config()

export const TOKEN = process.env.BOT_TOKEN

export const PREFIX = '!'

export const CHANNELS = {
  ECONOMY: process.env.ECONOMY_CHANNEL,
}

export const ROLES = {
  OWNER: process.env.OWNER,
}
