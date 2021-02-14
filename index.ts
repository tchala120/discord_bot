require('dotenv').config() // Recommended way of loading dotenv
import container from './src/inversify.config'
import { TYPES } from './src/types'
import { Bot } from './src/bot'

let bot = container.get<Bot>(TYPES.Bot)
bot
  .listen()
  .then((client) => {
    console.log('Logged in with bot', client.user.tag)
  })
  .catch((error) => {
    console.log('Oh no! ', error)
  })
