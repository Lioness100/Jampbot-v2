import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

@ApplyOptions<CommandOptions>('ping', {
  aliases: ['ping'],
  description: "View the client's ping",
})
export default class Ping extends Command {
  public run(message: Message): void {
    message.embed(
      `:ping_pong:  Pong! My ping is ${this.client.ws.ping}ms!`,
      true
    );
  }
}
