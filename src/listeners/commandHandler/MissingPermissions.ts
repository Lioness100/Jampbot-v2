import { Command, Listener, ListenerOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import { commaListsAnd } from 'common-tags';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('missingPermissions', {
  emitter: 'commandHandler',
  event: 'missingPermissions',
})
export default class MissingPermissionsListener extends Listener {
  public exec(
    message: Message,
    command: Command,
    _type: string,
    missing: string[] | string
  ): void {
    console.log(missing);
    this.client.logger.debug(
      commaListsAnd`${message.author.tag} lacked permissions when executing command '${command.id}'`
    );
    message.error(
      typeof missing === 'string'
        ? missing
        : 'Sorry, you have insufficient permissions'
    );
  }
}
