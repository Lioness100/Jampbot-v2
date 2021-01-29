import { Listener, ListenerOptions } from 'discord-akairo';
import type { MessageReaction, User } from 'discord.js';
import { channels } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('messageReactionAdd', {
  emitter: 'client',
  event: 'messageReactionAdd',
})
export default class MessageReactionAddListener extends Listener {
  public async exec(reaction: MessageReaction, user: User): Promise<void> {
    if (!user || user.bot) return;

    try {
      if (reaction.partial) await reaction.fetch();
      if (reaction.message.partial) await reaction.message.fetch();
    } catch (err) {
      return;
    }

    if (
      !reaction.message.author.bot ||
      reaction.message.channel.id !== channels.notes
    )
      return;

    const embed = (resolve = true) =>
      this.client.util.embed({
        ...reaction.message.embeds[0],
        color: resolve ? 15158332 : 3066993,
        footer: {
          text: resolve
            ? 'This note is resolved. React again to mark as unresolved'
            : 'React to mark as resolved',
        },
      });

    if (reaction.emoji.name === '👍') {
      void reaction.message.edit(embed());
      void reaction.remove();
      void reaction.message.react('👎');
      void reaction.message.unpin();
    } else if (reaction.emoji.name === '👎') {
      void reaction.message.edit(embed(false));
      void reaction.remove();
      void reaction.message.react('👍');
      void reaction.message.pin();
    }
  }
}
