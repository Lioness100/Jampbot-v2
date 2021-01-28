import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { load } from 'cheerio';
import { format } from 'date-fns';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { clocks } from '../../lib/utils/Constants';
import Command from '../../lib/structures/Command';

interface Args {
  location: string;
}

@ApplyOptions<CommandOptions>('time', {
  aliases: ['time', 'timezone', 'tz'],
  description: 'View the time in a different time zone',
  usage: '<timezone | location>',
  examples: ['pst', 'japan'],
  args: [
    {
      id: 'location',
      match: 'text',
      description: 'The timezone/location to search for',
      prompt: { start: 'Please provide a timezone/location to search for' },
    },
  ],
})
export default class TimeCommand extends Command {
  public async run(message: Message, { location }: Args): Promise<void> {
    const result = await this.client.util.fetch(
      encodeURI(`https://time.is/${location}`)
    );

    if (result.status !== 200) {
      return message.error(`"${location}" is not a valid timezone/location`);
    }

    const $ = load(result.body as Buffer);

    const date = new Date(
      `${($('#dd').contents()[0] as { data: string }).data!.split(', w')[0]} ${
        $('#clock').contents()[0].data
      }`
    );

    message.embed(
      `${clocks[date.getHours() % 12]}  It is currently ${format(
        date,
        'EEEE, MMMM Do yyyy @ h:mm a'
      )}, in ${
        /(?:Time in )?((?:[A-Z]\w+\s?)+) (?:now - Time\.is|- exact time now - Time\.is)/.exec(
          $('title').contents()[0].data!
        )?.[1] ?? location
      }`,
      true
    );
  }
}
