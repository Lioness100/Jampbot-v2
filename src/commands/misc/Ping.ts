import type { CommandOptions } from 'discord-akairo';
import { Message, Collection } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  leaderboard: boolean;
}

@ApplyOptions<CommandOptions>('ping', {
  aliases: ['ping'],
  description: "View the client's ping",
  args: [
    {
      id: 'leaderboard',
      match: 'flag',
      flag: ['--leaderboard', '--lb'],
      description: 'View the ping leaderboard for this instance',
    },
  ],
})
export default class Ping extends Command {
  private leaderboard = new Collection<string, number>();

  public async run(message: Message, { leaderboard }: Args): Promise<void> {
    if (leaderboard)
      message.embed(`Ping Leaderboard`, (embed) =>
        embed
          .addFields(
            this.leaderboard
              .sort()
              .map((value, name) => ({ name, value: this.ms(value) }))
              .slice(0, 5)
          )
          .setFooter('Leaderboards are reset every restart')
      );
    else {
      const sent = await message.util!.send(
        message.embed(`:ping_pong:  Pinging...`).setColor('BLUE')
      );

      const diff =
        (sent.editedTimestamp || sent.createdTimestamp) -
        (message.editedTimestamp || message.createdTimestamp);

      message.embed(`:ping_pong:  Pong!`, (embed) =>
        embed.addFields([
          { name: 'Bot Ping', value: this.ms(diff) },
          { name: 'Websocket Ping', value: this.ms(this.client.ws.ping) },
        ])
      );

      const previous = this.leaderboard.get(message.author.tag);
      if (!previous || previous > diff)
        this.leaderboard.set(message.author.tag, diff);
    }
  }

  private ms(ms: number) {
    return `${ms}ms`;
  }
}
