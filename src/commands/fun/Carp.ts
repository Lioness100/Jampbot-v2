import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { getColor } from 'colorthief';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';
import { carps } from '../../lib/utils/Constants';

@ApplyOptions<CommandOptions>('carp', {
  aliases: ['carp', 'carps', 'mrcarps'],
  description: 'View a random carp image',
  blockedChannels: 'default',
})
export default class Carp extends Command {
  public async run(message: Message): Promise<void> {
    const carp = this.client.util.sample(carps);
    void message.util!.send(
      message
        .embed()
        .setColor(await getColor(carp))
        .setImage(carp)
    );
  }
}
