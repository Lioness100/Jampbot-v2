import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('l', {
  aliases: [
    'l',
    'lul',
    'kappa',
    'k',
    'reggie',
    'r',
    'kek',
    'kekw',
    'j',
    'jebaited',
  ],
  description: 'Show your amusement regarding the above message',
})
export default class LCommand extends Command {
  public async run(message: Message): Promise<void> {
    await message.delete();
    const above = (await message.channel.messages.fetch({ limit: 1 })).first()!;
    void Promise.all(
      [
        '699435924630536303',
        '725148969134719036',
        '699438920789655732',
        '699442543582117889',
        '717925173956837378',
      ].map((e) => above.react(e))
    );
  }
}
