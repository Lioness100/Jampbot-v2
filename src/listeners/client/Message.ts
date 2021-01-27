import { Listener, ListenerOptions } from 'discord-akairo';
import type { Message, TextChannel } from 'discord.js';
import { channels, generalChannels } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('message', {
  emitter: 'client',
  event: 'message',
})
export default class MessageListener extends Listener {
  cooldowns = new Set();

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
      return (message.guild!.channels.cache.get(
        channels.log
      ) as TextChannel).send(
        `**${exec}**${
          emote ? ` ${emote}` : ''
        } submitted a clear for '${level}' by ${creator} and earned ${points} points`
      );
    }

    if (
      Math.random() <= 0.05 &&
      !message.author.bot &&
      generalChannels.includes(message.channel.id)
    ) {
      const modified = this.parseDad(message.content);
      if (modified)
        void message.channel.send(
          modified === 'Jampbot++'
            ? "You're not Jampbot++, I'm Jampbot++!"
            : `Hi ${
                modified.length > 2045 ? `${modified.slice(2042)}...` : modified
              }, I'm Jampbot++!`
        );
    }

    // if (message.content.replace(/<a?:[a-zA-Z0-9_]+:(\d{17,19})>/, '') > )
  }

  private parseClear(message: Message) {
    try {
      return {
        emote: /<a?:\w+Jamper|Jumper:\d{17,19}>/.exec(message.content),
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

  private parseDad(content: string) {
    return content
      .toLowerCase()
      .replace(/i am/g, 'im')
      .replace(/[^a-z\.\?\! ]/g, '')
      .split(/\.|\?|\!/)
      .map((i) => {
        i = ` ${i}`;
        const start = i.indexOf(' im ');
        if (start === -1) return;
        return i.slice(start);
      })
      .filter(Boolean)
      .join(' and ')
      ?.split(' im ')
      .map((i) => i.trim())
      .filter(Boolean)
      .join(' ');
  }
}
