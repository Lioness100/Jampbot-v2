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

  public run(message: Message, { leaderboard }: Args): void {
    if (leaderboard)
      message.embed(`Ping Leaderboard`, (embed) =>
        embed
          .addFields(
            this.leaderboard
              .sort()
              .map((value, name) => ({ name, value: `${value}ms` }))
              .slice(0, 5)
          )
          .setFooter('Leaderboards are reset every restart')
      );
    else {
      const ping = this.client.ws.ping;
      message.embed(`:ping_pong:  Pong! My ping is ${ping}ms!`, true);

      const previous = this.leaderboard.get(message.author.tag);
      if (!previous || previous > ping)
        this.leaderboard.set(message.author.tag, ping);
    }
  }
}
