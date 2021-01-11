import { Command, Inhibitor, InhibitorOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../lib/utils/ApplyOptions';

@ApplyOptions<InhibitorOptions>('channel', { reason: 'channel' })
export default class Channel extends Inhibitor {
  public exec(message: Message, command: Command): boolean {
    return (
      command.blockedChannels?.includes(message.channel.id) ??
      !(command.allowedChannels?.includes(message.channel.id) ?? true)
    );
  }
}
