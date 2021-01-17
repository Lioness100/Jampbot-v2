import { Structures, Message } from 'discord.js';
import { emotes } from '../utils/Constants';
import EnhancedEmbed from '../structures/EnhancedEmbed';

export default Structures.extend(
  'Message',
  () =>
    class extends Message {
      public embed(title?: string) {
        const embed = new EnhancedEmbed()
          .personalize(this.author)
          .setColor('GREEN');
        if (title) embed.setTitle(title);

        return embed;
      }

      public error(message: string, explanation?: string, useUtil = true) {
        const embed = this.embed(`:x: ${message} ${emotes.sad}`).setColor(
          'RED'
        );
        if (explanation) embed.setDescription(explanation);
        return this[this.util && useUtil ? 'util' : 'channel']!.send(embed);
      }
    }
);
