import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { getColor } from 'colorthief';
import { axolotls } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('axolotl', {
  aliases: ['axolotl'],
  blockedChannels: 'default',
  description: 'View a random image of an axolotl',
})
export default class QuagCommand extends Command {
  public async run(message: Message): Promise<void> {
    const axolotl = this.client.util.sample(axolotls);
    void message.util!.send(
      message
        .embed()
        .setColor(await getColor(axolotl).catch(() => 'GREEN'))
        .setImage(axolotl)
    );
  }
}
