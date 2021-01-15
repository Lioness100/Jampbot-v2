import { Command, Listener, ListenerOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('commandBlocked', {
  emitter: 'commandHandler',
  event: 'commandBlocked',
})
export default class commandBlocked extends Listener {
  public exec(message: Message, command: Command, reason: string): void {
    this.client.logger.debug(
      `${message.author.tag} was blocked from using the command '${command.id}' with reason '${reason}'`
    );

    if (['dm', 'guild'].includes(reason))
      void message.error(`You can only use this command in a ${reason}`);
  }
}
