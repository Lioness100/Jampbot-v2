import type { CommandOptions } from 'discord-akairo';
import type { Message, GuildMember } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { Command } from '../../lib/structures';

interface Args {
  member: GuildMember;
}

@ApplyOptions<CommandOptions>('exp', {
  aliases: ['exp', 'xp'],
  description: "View you or someone else's exp",
  usage: '[member]',
  examples: ['Lioness100'],
  blockedChannels: 'default',
  args: [
    {
      id: 'member',
      type: 'member',
      default: (message: Message) => message.member,
      description: 'The member to view exp of',
    },
  ],
})
export default class ExpCommand extends Command {
  public async run(message: Message, { member }: Args): Promise<void> {
    const levels = await this.client.db.Levels.findOne({ id: member.id });

    if (!levels)
      return message.error(
        `${
          member.id === message.author.id
            ? 'You have'
            : `${member.user.tag} has`
        } no exp`
      );

    const position =
      (
        await this.client.db.Levels.find({})
          .sort([['xp', 'descending']])
          .exec()
      ).findIndex(({ id }) => id === member.id) + 1;

    const bar = this.client.util.progressBar(
      levels.xp,
      this.client.db.Levels.xpFor(levels.level + 1)
    );

    message.embed(`Exp Stats`, (embed) =>
      embed.addFields([
        { name: 'Exp', value: levels.xp },
        { name: 'Level', value: levels.level },
        {
          name: 'Leaderboard Position',
          value: `${this.client.util.ordinal(position)} Place`,
        },
        {
          name: 'Points Needed For Level Up',
          value: `${
            this.client.db.Levels.xpFor(levels.level + 1) - levels.xp
          }\n\nTo next level:\n${bar}`,
        },
      ])
    );
  }
}
