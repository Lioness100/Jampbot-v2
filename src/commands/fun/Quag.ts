import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { getColor } from 'colorthief';
import { quags } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('quag', {
  aliases: ['quag', 'quagsire'],
  blockedChannels: 'default',
  description: 'View a random image of (the pokemon) quagsire',
})
export default class Quag extends Command {
  public async run(message: Message): Promise<void> {
    const quag = this.client.util.sample(quags);
    void message.util!.send(
      message
        .embed()
        .setColor(await getColor(quag))
        .setImage(quag)
    );
  }
}
