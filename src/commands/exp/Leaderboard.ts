import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { JampbotClient, Command, EnhancedEmbed } from '../../lib/structures';
import { Leaderboard } from '../../lib/utils/Constants';

interface Args {
  paginate: boolean;
}

@ApplyOptions<CommandOptions>('leaderboard', {
  aliases: ['leaderboard', 'lb'],
  description: 'View the exp leaderboard',
  usage: '[--paginate]',
  examples: ['--paginate'],
  blockedChannels: 'default',
  args: [
    {
      id: 'paginate',
      match: 'flag',
      flag: ['--paginate', '--pg'],
      description: 'Show 50 results instead of 5 in a paginating embed',
    },
  ],
})
export default class LeaderboardCommand extends Command {
  public async run(message: Message, { paginate }: Args): Promise<void> {
    const leaderboard = await this.client.db.Levels.calculateLeaderboard(
      this.client as JampbotClient,
      paginate ? 50 : 5
    );

    if (paginate)
      return void EnhancedEmbed.paginate(
        message,
        this.client.util
          .chunk(leaderboard, 5)
          .map((users) =>
            message
              .embed(`EXP Leaderboard`)
              .addFields(users.map(this.stats.bind(this)))
          )
      );

    message.embed(`EXP Leaderboard`, (embed) =>
      embed.addFields(leaderboard.map(this.stats.bind(this)))
    );
  }

  private stats(user: Leaderboard) {
    return {
      name: `${this.client.util.ordinal(user.position)} Place - ${user.tag}`,
      value: `**Level**: ${user.level}\n**EXP**: ${user.xp}`,
    };
  }
}
