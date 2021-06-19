import type { CommandOptions } from 'discord-akairo';
import type { Message, GuildMember, TextChannel } from 'discord.js';
import { formatDistanceToNowStrict } from 'date-fns';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';
import { channels } from '../../lib/utils/Constants';

interface Args {
  member: GuildMember;
  reason: string;
  duration?: number;
}

@ApplyOptions<CommandOptions>('mute', {
  aliases: ['mute'],
  description: 'Mute a member',
  usage: '<member> [reason] [--duration <duration>]',
  examples: ['@Lioness100 spamming', 'Lioness --duration 2d'],
  channel: 'guild',
  userPermissions: (message: Message) => 
    message.member.roles.cache.some(({ id }) =>
      ["704378683988639834", "801180526740373544"].includes(id)
    )
      ? null
      : true;
  args: [
    {
      id: 'member',
      type: 'member',
      description: 'The member to mute',
      prompt: {
        start: 'Who would you like to mute?',
        retry: 'Please provide a valid member',
      },
    },
    {
      id: 'reason',
      type: 'rest',
      description: 'The reason for muting',
      default: 'No reason provided',
    },
    {
      id: 'duration',
      match: 'option',
      type: 'duration',
      flag: ['--duration', '--d'],
      description: 'How long to mute the member',
      prompt: { retry: 'Please provide a valid date', optional: true },
    },
  ],
})
export default class MuteCommand extends Command {
  public async run(
    message: Message,
    { member, reason, duration }: Args
  ): Promise<unknown> {
    if (message.author.id === member.id)
      return message.error("You can't mute yourself");
    if (message.author.id === this.client.user!.id)
      return message.error("You can't mute me");
    if (message.member!.roles.highest.position <= member.roles.highest.position)
      return message.error(
        "You can't mute someone who's highest role position is equal to or greator than yours"
      );

    const mute =
      (await this.client.db.Mutes.findOne({ id: member.id })) ||
      new this.client.db.Mutes({ id: member.id });

    if (mute.active)
      return message.error(`${member.user.tag} is already muted`);

    await member.roles.add('699370128889872414');

    const embed = message
      .embed()
      .setColor('RED')
      .addField('Reason:', reason)
      .setFooter(
        `Muted by ${message.author.tag}`,
        message.author.displayAvatarURL()
      )
      .setTimestamp();

    if (duration)
      embed.addField(
        'Duration:',
        formatDistanceToNowStrict(Date.now() + duration)
      );

    try {
      void member.send(
        this.client.util
          .embed(embed)
          .setTitle('You have been muted')
          .setDescription(
            'Please visit the #anti-softlock channel in Team Jamp with any questions or concerns'
          )
      );
    } catch (err) {
      // do nothing
    }

    message.embed(`${member.user.tag} has been muted`, true);

    void (message.guild!.channels.cache.get(channels.log) as TextChannel).send(
      embed.setTitle(`${member.user.tag} has been muted`)
    );

    mute.active = {
      exec: message.author.id,
      reason,
      start: Date.now(),
      duration,
    };

    mute.previous++;

    await mute.save();
    mute.startTimer(this.client);
  }
}
