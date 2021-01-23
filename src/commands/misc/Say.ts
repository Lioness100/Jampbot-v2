import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  content: string;
}

@ApplyOptions<CommandOptions>('say', {
  aliases: ['say'],
  description: 'Say stuff as the bot',
  ownerOnly: true,
  args: [{ id: 'content', match: 'rest' }],
})
export default class Say extends Command {
  public run(message: Message, { content }: Args): void {
    void message.delete();
    if (content.length) void message.channel.send(content);
  }
}
