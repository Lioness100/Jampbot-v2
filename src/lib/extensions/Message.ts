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
        return this[this.util && useUtil ? 'util' : 'channel']!.send(
          this.embed()
            .setColor('RED')
            .setTitle(`:x: ${message} ${emotes.sad}`)
            .setDescription(explanation)
        );
      }
    }
);
