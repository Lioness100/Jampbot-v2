import { CommandOptions, Command } from 'discord-akairo';
import type { Message, GuildMember } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

interface Args {
  member: GuildMember;
}

@ApplyOptions<CommandOptions>('userinfo', {
  aliases: ['userinfo', 'uinfo', 'memberinfo', 'minfo'],
  description: "View a member's info",
  usage: '<member>',
  examples: ['@Lioness100#4566'],
  args: [
    {
      id: 'member',
      type: 'member',
      default: (message: Message) => message.member,
    },
  ],
})
export default class UserInfo extends Command {
  public exec(message: Message, { member }: Args): void {
    void message.util!.send(
      this.client.util
        .embed()
        .personalize(member)
        .setTitle('User Info')
        .setThumbnail(
          member.user.displayAvatarURL({ dynamic: true, size: 4096 })
        )
        .addFields(this.client.util.getMemberInfo(member))
        .setFooter(`ID: ${member.id}`)
    );
  }
}
