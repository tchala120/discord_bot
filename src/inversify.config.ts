import 'reflect-metadata'
import { config } from 'dotenv'
import { Container } from 'inversify'
import { Client } from 'discord.js'
import { TYPES } from './types'
import { Bot } from './bot'
import Coin from './coin'

config()

const container = new Container()

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope()
container.bind<Coin>(TYPES.Coin).to(Coin).inSingletonScope()
container.bind<Client>(TYPES.Client).toConstantValue(new Client())
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN || '')

export default container
