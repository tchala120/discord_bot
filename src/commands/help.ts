import { Message } from 'discord.js'

export class Help {
  public process(message: Message) {
    message.reply(null, {
      embed: {
        color: 0xce4760,
        author: {
          name: 'Panupong Tipjoi',
        },
        title: 'Help commands',
        description: 'The commands list will show here:',
        fields: [
          {
            name: 'Music',
            value: '!play {music_name | youtube_path}',
          },
          {
            name: 'Help',
            value: '!help, !',
          },
          {
            name: 'Github',
            value: '!github',
          },
        ],
      },
    })
  }
}

export default { Help }
