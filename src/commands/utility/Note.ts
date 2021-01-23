import { CommandOptions, Argument } from 'discord-akairo';
import type { Message, TextChannel } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';
import { channels } from '../../lib/utils/Constants';

interface Args {
  note: string;
}

@ApplyOptions<CommandOptions>('note', {
  aliases: ['note'],
  description: 'Add a mod note to the roadmap',
  channel: 'guild',
  userPermissions: (message: Message) =>
    message.member!.roles.cache.has('704378683988639834') ? null : true,
  usage: '<description>',
  examples: ['ban exec'],
  args: [
    {
      id: 'note',
      match: 'rest',
      type: Argument.validate(
        'string',
        (message, phrase, string: string) => string.length <= 2048
      ),
      description: 'The note to... note',
      prompt: {
        start: 'What would you like to note?',
        retry: 'Please make sure your note is at most 2048 characters',
      },
    },
  ],
})
export default class Note extends Command {
  public async run(message: Message, { note }: Args): Promise<void> {
    const sent = await (message.guild!.channels.cache.get(
      channels.notes
    ) as TextChannel).send(
      message
        .embed(`Noted by ${message.author.tag}`)
        .setThumbnail(
          'https://cdn0.iconfinder.com/data/icons/online-education-butterscotch-vol-2/512/Student_Notes-512.png'
        )
        .setDescription(note)
        .setFooter('React to mark as resolved')
    );

    void sent.react('👍');
    void sent.pin();

    message.embed('Note added', true);
  }
}
