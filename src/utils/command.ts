import { ICommand } from '../commands'

function condition(command: ICommand, arg: string) {
  return command.key === arg
}

export function isCommandDetected(commands: ICommand[], arg: string): boolean {
  return commands.some((command) => condition(command, arg))
}

export function findMatchCommand(commands: ICommand[], arg: string): ICommand | undefined {
  return commands.find((command) => condition(command, arg))
}

export default { isCommandDetected }
