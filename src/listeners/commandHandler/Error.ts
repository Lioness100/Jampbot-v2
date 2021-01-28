import { Command, Listener, ListenerOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('commandError', {
  emitter: 'commandHandler',
  event: 'error',
})
export default class CommandErrorListener extends Listener {
  public exec(error: Error, message: Message, command?: Command): void {
    this.client.logger.error(
      `Error occured with command: '${command?.id ?? 'N/A'}': ${
        error.stack || error
      }`
    );
    if (message.author)
      message.error(
        `An unexpected error occured!`,
        `\`\`\`js\n${error}\n\`\`\``
      );
  }
}
