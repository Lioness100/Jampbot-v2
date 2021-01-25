import type { CommandOptions } from 'discord-akairo';
import type { Message, GuildMember } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  member: GuildMember;
  reason?: string;
}

@ApplyOptions<CommandOptions>('unmute', {
  aliases: ['unmute'],
  description: 'Unmute a member',
  usage: '<member> [reason]',
  examples: ["@Lioness100 I think you've learned your lession >:)", 'Lioness'],
  channel: 'guild',
  userPermissions: 'MANAGE_ROLES',
  args: [
    {
      id: 'member',
      type: 'member',
      description: 'The member to unmute',
      prompt: {
        start: 'Who would you like to mute?',
        retry: 'Please provide a valid member',
      },
    },
    {
      id: 'reason',
      type: 'rest',
      description: 'The reason to unmute, if any',
      default: 'No reason provided',
    },
  ],
})
export default class Unmute extends Command {
  public async run(message: Message, { member, reason }: Args): Promise<void> {
    const mute = await this.client.db.Mutes.findOne({ member: member.id });
    if (!mute?.active) return message.error(`${member.user.tag} is not muted`);
    if (!member.roles.cache.has('699370128889872414')) {
      mute.active = undefined;
      void mute.save();
      return message.error(`${member.user.tag} is not muted`);
    }

    await mute.unmute(this.client, reason);
    message.embed(`${member.user.tag} was unmuted`);
  }
}
