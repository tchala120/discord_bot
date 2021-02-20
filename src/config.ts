import { config } from 'dotenv'

config()

export const TOKEN = process.env.BOT_TOKEN

export const PREFIX = '!'

export const ROLES = {
  OWNER: '810852554358390814',
}
