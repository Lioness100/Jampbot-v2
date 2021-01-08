import { Command, CommandOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<CommandOptions>('ping', {
  aliases: ['ping'],
  description: "View the client's ping",
  category: 'misc',
})
export default class Ping extends Command {
  public exec(message: Message): void {
    void message.channel.send(
      message.embed(`:ping_pong:  Pong! My ping is ${this.client.ws.ping}ms!`)
    );
  }
}
