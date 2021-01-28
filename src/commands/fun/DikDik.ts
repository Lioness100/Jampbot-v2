import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { getColor } from 'colorthief';
import { dikdiks } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('dikdik', {
  aliases: ['dikdik'],
  description: 'Generate a random dikdik',
  blockedChannels: 'default',
  userPermissions: (message: Message) =>
    ['592950968354865162', '591923920261873677'].includes(message.author.id)
      ? null
      : 'Only members of the dikdik cult can use this command',
})
export default class DikDikCommand extends Command {
  public async run(message: Message): Promise<void> {
    const dikdik = this.client.util.sample(dikdiks);
    void message.util!.send(
      message
        .embed()
        .setColor(await getColor(dikdik))
        .setImage(dikdik)
    );
  }
}
