import { Bot } from './bot'

new Bot().start().catch((e) => console.log('Unexecpected error when starting bot.', e))
