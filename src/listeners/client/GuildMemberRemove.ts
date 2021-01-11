import { Listener, ListenerOptions } from 'discord-akairo';
import { GuildMember, TextChannel } from 'discord.js';
import { format, formatDistanceToNow } from 'date-fns';
import EnhancedEmbed from '../../lib/structures/EnhancedEmbed';
import { channels, roles } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('guildMemberRemove', {
  emitter: 'client',
  event: 'guildMemberRemove',
})
export default class GuildMemberRemove extends Listener {
  public exec(member: GuildMember): void {
    void (member.guild.channels.cache.get(channels.log) as TextChannel).send(
      new EnhancedEmbed()
        .personalize(member)
        .setColor('RED')
        .setTitle(`${member.user.tag} left the server`)
        .addFields([
          {
            name: 'Member Joined:',
            value: `${format(
              member.joinedAt,
              'd MMM yyyy, h:mm a'
            )} (${formatDistanceToNow(member.joinedTimestamp)} ago)`,
          },
          {
            name: 'Account Created:',
            value: `${format(
              member.user.createdAt,
              'd MMM yyyy, h:mm a'
            )} (${formatDistanceToNow(member.user.createdTimestamp)} ago)`,
          },
          {
            name: 'Verified:',
            value: member.roles.cache.has(roles.member),
          },
          {
            name: 'Jamp Rank:',
            value:
              member.roles.cache.find(({ name }) => /Jamper$/.test(name))
                ?.name ?? 'Unranked',
          },
          {
            name: 'EXP:',
            value: 'TODO',
          },
        ])
        .setFooter(member.id)
        .setTimestamp()
    );
  }
}
