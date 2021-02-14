import { Message } from 'discord.js'
import { Github } from './github'
import { Help } from './help'
import { Play } from './play'

export interface CommandClass {
  process: (message: Message) => void
}

export interface ICommand {
  key: string
  value: CommandClass
}

const commands: ICommand[] = [
  {
    key: 'help',
    value: new Help(),
  },
  {
    key: 'github',
    value: new Github(),
  },
  {
    key: 'play',
    value: new Play(),
  },
]

export default commands
