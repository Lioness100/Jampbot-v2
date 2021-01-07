import { Structures, MessageEmbed, Message } from 'discord.js';

export default Structures.extend(
  'Message',
  () =>
    class extends Message {
      embed(title?: string) {
        return new MessageEmbed()
          .setColor('GREEN')
          .setAuthor(
            this.author.username,
            this.author.displayAvatarURL({ dynamic: true })
          )
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
