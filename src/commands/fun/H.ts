import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('h', {
  aliases: ['h', 'p', 'hype', 'pog', 'y', 'yay', 'noice'],
  description: 'Show your excitement regarding the above message',
})
export default class HCommand extends Command {
  public async run(message: Message): Promise<void> {
    await message.delete();
    const above = (await message.channel.messages.fetch({ limit: 1 })).first()!;
    void Promise.all(
      [
        '796585159607975947',
        '718985469337010206',
        '792058873640517722',
        '717925533265952832',
        '749993939771064360',
        '719647374804385913',
        '717924925838590012',
        '719434810761936917',
        '797330187544297542',
      ].map((e) => above.react(e))
    );
  }
}
