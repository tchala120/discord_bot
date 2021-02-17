import { Bot } from './src/bot'

new Bot().start().catch((e) => console.log('Unexecpected error when starting bot.', e))
