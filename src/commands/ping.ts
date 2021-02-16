import { Message } from 'discord.js'

export const execute = (message: Message, args: any[]) => {
  console.log(args)
  message.channel.send('Pong!')
}

export const name = 'ping'
export const description = 'This is ping command!'
