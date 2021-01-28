import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { replies, emotes } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  question: string;
}

@ApplyOptions<CommandOptions>('8ball', {
  aliases: ['8ball'],
  description: 'Ask a question to the 8Ball',
  usage: '<question>',
  examples: ['should I do my homework'],
  args: [
    {
      id: 'question',
      match: 'rest',
      prompt: {
        start: 'What is your question?',
      },
      description: 'The question to ask',
    },
  ],
})
export default class EightBallCommand extends Command {
  public run(message: Message, { question }: Args): void {
    void message.util!.send(
      message
        .embed(`The 8Ball Has Spoken ${emotes.hype}`)
        .setColor('RANDOM')
        .addFields([
          { name: 'Question:', value: this.client.util.upper(question) },
          { name: 'Answer:', value: this.client.util.sample(replies) },
        ])
    );
  }
}
