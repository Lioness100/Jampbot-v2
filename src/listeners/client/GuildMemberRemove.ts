import { Listener, ListenerOptions } from 'discord-akairo';
import { GuildMember, TextChannel } from 'discord.js';
import EnhancedEmbed from '../../lib/structures/EnhancedEmbed';
import { channels } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('guildMemberRemove', {
  emitter: 'client',
  event: 'guildMemberRemove',
})
export default class GuildMemberRemove extends Listener {
  public async exec(member: GuildMember): Promise<void> {
    void ((await this.client.channels.fetch(channels.log)) as TextChannel).send(
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
