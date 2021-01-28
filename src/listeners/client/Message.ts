import { Listener, ListenerOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import { spamChannels, emotes } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('message', {
  emitter: 'client',
  event: 'message',
})
export default class MessageListener extends Listener {
  private cooldowns = new Set();

  public async exec(message: Message): Promise<unknown> {
    if (
      spamChannels.includes(message.channel.id) ||
      message.author.bot ||
      this.cooldowns.has(message.author.id) ||
      message.content.replace(/<a?:[a-zA-Z0-9_]+:(\d{17,19})>/, ' ').length < 10
    )
      return;

    this.cooldowns.add(message.author.id);
    setTimeout(() => this.cooldowns.delete(message.author.id), 1.2e5);

    const levels =
      (await this.client.db.Levels.findOne({ id: message.author.id })) ||
      new this.client.db.Levels({ id: message.author.id });

    const leveledUp = await levels.append(~~(Math.random() * 30) + 1);

    if (leveledUp)
      message.embed(
        `You leveled up to level ${levels.level + 1} ${emotes.hooray}`,
        (embed) =>
          embed.setFooter(
            `Congratulations! You need ${this.client.db.Levels.xpFor(
              levels.level + 2
            )} EXP to level up again`
          ),
        false
      );
  }
}
