import { Listener, ListenerOptions } from 'discord-akairo';
import { GuildMember, TextChannel } from 'discord.js';
import EnhancedEmbed from '../../lib/structures/EnhancedEmbed';
import { channels } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('guildMemberRemove', {
  emitter: 'client',
  event: 'guildMemberRemove',
})
export default class GuildMemberRemoveListener extends Listener {
  public exec(member: GuildMember): void {
    void (member.guild.channels.cache.get(channels.log) as TextChannel).send(
      new EnhancedEmbed()
        .personalize(member)
        .setColor('RED')
        .setTitle(`${member.user.tag} left the server`)
        .addFields(this.client.util.getMemberInfo(member))
        .setFooter(`ID ${member.id}`)
        .setTimestamp()
    );
  }
}
