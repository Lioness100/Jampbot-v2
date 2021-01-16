import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { load } from 'cheerio';
import { format } from 'date-fns';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { Response, clocks } from '../../lib/utils/Constants';
import Command from '../../lib/structures/Command';

interface Args {
  location?: string;
}

@ApplyOptions<CommandOptions>('time', {
  aliases: ['time', 'timezone', 'tz'],
  description: 'View the time in a different time zone',
  usage: '<timezone | location>',
  examples: ['pst', 'japan'],
  args: [{ id: 'location', match: 'text' }],
})
export default class Time extends Command {
  public async run(message: Message, { location }: Args): Promise<void> {
    if (!location) {
      void message.error(
        "You didn't provide a timezone/location to search for"
      );
      return;
    }

    const result = (await this.client.util.fetch(
      encodeURI(`https://time.is/${location}`)
    )) as Response;

    if (result.status !== 200) {
      void message.error(`"${location}" is not a valid timezone/location`);
      return;
    }

    const $ = load(result.body as Buffer);

    const date = new Date(
      `${($('#dd').contents()[0] as { data: string }).data!.split(', w')[0]} ${
        $('#clock').contents()[0].data
      }`
    );

    void message.util!.send(
      message.embed(
        `${clocks[date.getHours() % 12]}  It is currently ${format(
          date,
          'EEEE, MMMM Do yyyy @ h:mm a'
        )}, in ${
          /(?:Time in )?((?:[A-Z]\w+\s?)+) (?:now - Time\.is|- exact time now - Time\.is)/.exec(
            $('title').contents()[0].data!
          )?.[1] ?? location
        }`
      )
    );
  }
}
