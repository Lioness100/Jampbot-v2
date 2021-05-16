import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { title } from 'coolstory.js';
import deepai from 'deepai';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

deepai.setApiKey(process.env.DEEPAI_API_KEY!);

interface Args {
  text: string;
}

@ApplyOptions<CommandOptions>('generate', {
  aliases: ['generate'],
  description: 'Generate a story from a sentence!',
  cooldown: 1e4,
  args: [
    {
      id: 'text',
      match: 'rest',
      prompt: {
        start: 'What is your starting sentence??',
      },
      description: 'The sentence to start with',
    },
  ],
  channel: 'guild',
  userPermissions(message: Message) {
    const member = message.member;
    if (!member) return false;

    if (
      member.roles.cache.has('829122918692421663') ||
      member.roles.cache.has('829122928158572544')
    )
      return null;
    return '<:MunchlaxMunch:796832214603923577>';
  },
})
export default class GenerateCommand extends Command {
  public async run(message: Message, { text }: Args): Promise<void> {
    try {
      const { output } = await deepai.callStandardApi('text-generator', {
        text,
      });
      message.embed(title(), (embed) =>
        embed
          .setAuthor(
            `Written by ${message.author.username}`,
            message.author.displayAvatarURL()
          )
          .setDescription(`${output}...`)
      );
    } catch (e) {
      message.error('Something went wrong!', `\`\`\`\n${e}\n\`\`\``);
    }
  }
}
