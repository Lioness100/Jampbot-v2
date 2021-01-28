import { Listener, ListenerOptions } from 'discord-akairo';
import type { Message, TextChannel } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { channels } from '../../lib/utils/Constants';

@ApplyOptions<ListenerOptions>('messageInvalid', {
  emitter: 'commandHandler',
  event: 'messageInvalid',
})
export default class MessageInvalid extends Listener {
  public exec(message: Message): unknown {
    if (!message.guild) return;

    if (message.author.bot && message.type === 'PINS_ADD')
      return message.delete();

    if (
      message.author.id === '666085542085001246' &&
      message.content.includes('‣You have cleared') &&
      message.content.includes('‣You have earned')
    ) {
      const { exec, emote, level, creator, points } = this.parseClear(message);

      if (points <= 5.9) return;
      return (message.guild.channels.cache.get(
        channels.log
      ) as TextChannel).send(
        `**${exec}**${
          emote ? ` ${emote}` : ''
        } submitted a clear for '${level}' by ${creator} and earned ${points} points`
      );
    }
  }

  private parseClear(message: Message) {
    try {
      return {
        emote: /<a?:\w+(Jamper|Jumper):\d{17,19}>/.exec(message.content),
        points: +/(\d\d?(?:\.\d)?) points?/.exec(message.content)![1],
        level: /'(.+)'/.exec(message.content)![1],
        creator:
          this.client.util.resolveMember(
            / by (.+?)(?=\s<a?:)+/.exec(message.content)![1],
            message.guild!.members.cache,
            true,
            true
          )?.user.tag ?? / by (.+?)(?=\s<a?:)+/.exec(message.content)![1],
        exec:
          this.client.util.resolveMember(
            /.+?\n/.exec(message.content)![0],
            message.guild!.members.cache,
            true,
            true
          )?.user.tag ?? /.+?(?=<a?:)/.exec(message.content)![0],
      };
    } catch (err) {
      this.client.logger.error('Error whilst tracking clears: ', err);
      return { points: 0 };
    }
  }
}
