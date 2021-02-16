import { User } from 'discord.js'

class Coin {
  private amount: number = 0

  private holder: User

  public constructor(holder: User, amount: number) {
    this.amount = amount
    this.holder = holder
  }

  public getAmount(): number {
    return this.amount
  }

  public getHolder(): User {
    return this.holder
  }

  public giveCoin() {
    this.amount += 50
  }
}

export default Coin
