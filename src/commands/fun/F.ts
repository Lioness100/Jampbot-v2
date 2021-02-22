import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('f', {
  aliases: ['f'],
  description: 'Pay your respects to the above message',
})
export default class FCommand extends Command {
  public async run(message: Message): Promise<void> {
    await message.delete();
    const above = (await message.channel.messages.fetch({ limit: 1 })).first()!;
    void Promise.all(
      [
        '755405176797397163',
        '717925128331329607',
        '717575061468610560',
        '717597015911170059',
        '776005241413697576',
        '753634070000304279',
        '796431751382827019',
        '719436992211058709',
        '699953288778350606',
        '792238322612568124',
        '🇫',
      ].map((e) => above.react(e))
    );
  }
}
