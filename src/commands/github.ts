import { Message } from 'discord.js'

export class Github {
  public process(message: Message) {
    message.reply('https://github.com/tchala120/discord_bot')
  }
}

export default { Github }
