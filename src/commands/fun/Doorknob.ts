import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { getColor } from 'colorthief';
import { doorknobs } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('doorknob', {
  aliases: ['doorknob'],
  blockedChannels: 'default',
  description: 'View a random image of a doorknob',
})
export default class QuagCommand extends Command {
  public async run(message: Message): Promise<void> {
    const doorknob = this.client.util.sample(doorknobs);
    void message.util!.send(
      message
        .embed()
        .setColor(await getColor(doorknob).catch(() => 'GREEN'))
        .setImage(doorknob)
    );
  }
}
