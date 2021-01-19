import { Structures, Message } from 'discord.js';
import { emotes } from '../utils/Constants';
import EnhancedEmbed from '../structures/EnhancedEmbed';

export default Structures.extend(
  'Message',
  () =>
    class extends Message {
      public embed(
        title?: string,
        send: boolean | ((embed: EnhancedEmbed) => unknown) = false,
        useUtil = true
      ) {
        const embed = new EnhancedEmbed()
          .personalize(this.author)
          .setColor('GREEN');

        if (title) embed.setTitle(title);

        if (send) {
          if (typeof send === 'function') send(embed);
          void this[this.util && useUtil ? 'util' : 'channel']!.send(embed);
        }

        return embed;
      }

      public error(message: string, explanation?: string, useUtil = true) {
        this.embed(
          `:x: ${message} ${emotes.sad}`,
          (embed) => {
            embed.setColor('RED');
            if (explanation) embed.setDescription(explanation);
          },
          useUtil
        );
      }
    }
);
