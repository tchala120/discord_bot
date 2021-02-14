import { Message } from 'discord.js'

export class Help {
  public process(message: Message) {
    message.reply('Help command')
  }
}

export default { Help }
