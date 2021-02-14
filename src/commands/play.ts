import { Message } from 'discord.js'

export class Play {
  public process(message: Message) {
    message.reply('Play command')
  }
}
export default { Play }
