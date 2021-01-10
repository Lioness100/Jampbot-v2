import { Structures, Message } from 'discord.js';
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

      error(message: string, explanation?: string) {
        return this.channel.send(
          this.embed()
            .setColor('RED')
            .setTitle(`:x: ${message} :x:`)
            .setDescription(explanation)
        );
      }
    }
);
