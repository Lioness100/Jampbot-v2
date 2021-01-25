import { CommandOptions, Argument } from 'discord-akairo';
import type {
  Message,
  GuildMember,
  MessageReaction,
  User,
  TextChannel,
} from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';
import { channels } from '../../lib/utils/Constants';

interface Args {
  member: GuildMember;
  reason: string;
  days: number;
}

@ApplyOptions<CommandOptions>('ban', {
  aliases: ['ban'],
  description: 'Ban a member',
  usage: '<member> [reason] [--days <1-7>]',
  examples: ['@Lioness100 being annoying', 'Lioness --days 2'],
  channel: 'guild',
  userPermissions: 'BAN_MEMBERS',
  args: [
    {
      id: 'member',
      type: 'member',
      description: 'The member to ban',
      prompt: {
        start: 'Who would you like to ban?',
        retry: "That's not a valid user",
      },
    },
    {
      id: 'reason',
      type: 'rest',
      description: 'The reason to ban',
      default: 'No reason provided',
    },
    {
      id: 'days',
      match: 'option',
      flag: ['--days', '--days='],
      type: Argument.range('number', 0, 7),
      prompt: {
        optional: true,
        start: 'Make sure the number of days is between 1 and 7',
        retry: "That's not a valid number between 1 and 7",
      },
      default: 0,
      description: 'Number of days of messages to delete',
    },
  ],
})
export default class Ban extends Command {
  public async run(
    message: Message,
    { member, reason, days }: Args
  ): Promise<unknown> {
    if (message.author.id === member.id)
      return message.error("You can't ban yourself");
    if (message.author.id === this.client.user!.id)
      return message.error("You can't ban me");
    if (message.member!.roles.highest.position <= member.roles.highest.position)
      return message.error(
        "You can't ban someone who's highest role position is equal to or greator than yours"
      );
    if (!member.bannable) return message.error("This member can't be banned");

    const sent = await message.util!.send(
      message
        .embed(`Are you sure you want to ban ${member.user.tag}?`)
        .addFields([
          this.client.util.getMemberInfo(member)[0],
          {
            name: 'Mutes',
            value: `${
              (await this.client.db.Mutes.findOne({ id: member.id }))
                ?.previous ?? 0
            }`,
          },
          { name: 'Warns', value: '0' },
        ])
    );

    await sent.react('✅');
    await sent.react('❌');

    const collected = await sent.awaitReactions(
      (reaction: MessageReaction, user: User) =>
        user.id === message.author.id &&
        ['✅', '❌'].includes(reaction.emoji.name),
      { max: 1, time: 30000 }
    );

    if (!collected?.size) {
      void sent.reactions.removeAll();
      const error = await message.util!.send(
        message.embed(`You didn't react in time`).setColor('RED')
      );
      return error.delete({ timeout: 5000 });
    }

    if (collected.first()!.emoji.name === '✅') {
      const embed = message
        .embed()
        .setColor('RED')
        .addField('Reason:', reason)
        .setFooter(
          `Banned by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      try {
        await member.send(
          this.client.util
            .embed(embed)
            .setTitle(`You have been banned from Team Jamp`)
            .setDescription(
              'Please send a friend request to @Lioness100#4566 and message them if you have any questions or concerns'
            )
        );
      } catch (err) {
        // do nothing
      }

      await member.ban({ reason, days });

      message.embed(`${member.user.tag} has been banned`, true);

      void (message.guild!.channels.cache.get(
        channels.log
      ) as TextChannel).send(embed);
    } else {
      void message.reactions.removeAll();
      const error = await message.util!.send(
        message.embed("Ok, I won't ban that member")
      );
      void error.delete({ timeout: 5000 });
    }
  }
}
