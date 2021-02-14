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

  public async listen(): Promise<Client> {
    this.client.on('message', (message: Message) => {
      if (message.author.bot) return

      const args: string[] = message.content.substring(this.PREFIX.length).split(' ')

      if (message.content.startsWith('!')) {
        if (isCommandDetected(commands, args[0]) || !args[0]) {
          const command = findMatchCommand(commands, args[0] || 'help')
          command?.value.process(message)
          return
        }
      } else {
        return
      }
    })

    await this.client.login(this.token)
    return this.client
  }
}

export default { Bot }
