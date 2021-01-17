import { Structures, Message } from 'discord.js';
import { emotes } from '../utils/Constants';
import EnhancedEmbed from '../structures/EnhancedEmbed';

export default Structures.extend(
  'Message',
  () =>
    class extends Message {
      embed(title?: string) {
        return new EnhancedEmbed()
          .personalize(this.author)
          .setColor('GREEN')
          .setTitle(title);
      }

      error(message: string, explanation?: string, useUtil = true) {
        const embed = this.embed(`:x: ${message} ${emotes.sad}`).setColor(
          'RED'
        );
        if (explanation) embed.setDescription(explanation);
        return this[this.util && useUtil ? 'util' : 'channel']!.send(embed);
      }
    }
);
