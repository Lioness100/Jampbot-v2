import { Command, Listener, ListenerOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('commandStarted', {
  emitter: 'commandHandler',
  event: 'commandStarted',
})
export default class CommandStarted extends Listener {
  public exec(message: Message, command: Command): void {
    this.client.logger.debug(
      `${message.author.tag} triggered command '${command.id}'`
    );
  }
}
