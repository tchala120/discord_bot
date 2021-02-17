import { config } from 'dotenv'

config()

export const TOKEN = process.env.BOT_TOKEN

export const PREFIX = '!'

export const channels = {
  economy: process.env.ECONOMY_CHANNEL,
}
