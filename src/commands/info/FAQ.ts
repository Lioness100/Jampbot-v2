import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { questions } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  question: string;
  menu: boolean;
}

@ApplyOptions<CommandOptions>('faq', {
  aliases: ['faq'],
  description: 'Sends answers and examples for FAQs',
  usage: '<number | keyword | --menu>',
  examples: ['2', 'levels'],
  args: [
    {
      id: 'question',
      type: questions.map(({ key }, idx) => [(idx + 1).toString(), key]),
      description: 'Number or keyword of the FAQ',
      prompt: {
        start:
          'Please provide the number/keyword of the FAQ (or cancel and use `!faq --menu`)',
      },
    },
    {
      id: 'menu',
      match: 'flag',
      flag: ['--menu', '--m'],
      description: 'Show all number/keywords and the FAW the correspond with',
    },
  ],
})
export default class FAQCommand extends Command {
  public run(message: Message, { question, menu }: Args): unknown {
    if (menu)
      return message.embed('FAQ Menu', (embed) =>
        embed.addFields(
          questions.map(({ key, desc }, idx) => ({
            name: `__**faq ${idx + 1} / faq ${key}**__`,
            value: desc,
          }))
        )
      );

    const faq = questions[+question - 1];

    message.embed(faq.desc, (embed) =>
      embed.setDescription(faq.answer).setImage(faq.pic)
    );
  }
}
