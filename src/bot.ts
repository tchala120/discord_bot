import { Client, Message } from 'discord.js'
import { config } from 'dotenv'
import { inject, injectable } from 'inversify'
import { TYPES } from './types'
import commands from './commands'
import { findMatchCommand, isCommandDetected } from './utils/command'

config()

@injectable()
export class Bot {
  private client: Client
  private readonly token: string

  private readonly PREFIX: string = '!'

  constructor(@inject(TYPES.Client) client: Client, @inject(TYPES.Token) token: string) {
    this.client = client
    this.token = token
  }

  public listen(): Promise<string> {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) return

      const args: string[] = message.content.substring(this.PREFIX.length).split(' ')

      if (isCommandDetected(commands, args[0])) {
        const command = findMatchCommand(commands, args[0])
        command?.value.process(message)
        return
      }
    })
    return this.client.login(this.token)
  }
}

export default { Bot }
