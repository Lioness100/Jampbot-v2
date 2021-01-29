import {
  MessageEmbed,
  User,
  GuildMember,
  Message,
  MessageReaction,
} from 'discord.js';

export default class EnhancedEmbed extends MessageEmbed {
  public personalize(person: User | GuildMember): this {
    const user = person instanceof GuildMember ? person.user : person;
    this.setAuthor(user.tag, user.displayAvatarURL());
    if (person instanceof GuildMember) this.setColor(person.displayHexColor);
    return this;
  }

  public addBlankField(): this {
    return this.addField('\u200b', '\u200b');
  }

  static async paginate(
    message: Message,
    pages: EnhancedEmbed[],
    ids = [message.author.id],
    useUtil = true
  ): Promise<Message> {
    let page = 0;
    const footer = () => `Showing Page ${page + 1} / ${pages.length}`;
    const current = await message[useUtil ? 'util' : 'channel'].send(
      pages[page].setFooter(footer())
    );

    const emojis = ['⏪', '⏩'];
    await current.reactAll('⏪', '⏩');

    const collector = current.createReactionCollector(
      (reaction: MessageReaction, author: User) =>
        emojis.includes(reaction.emoji.name) && ids.includes(author.id),
      { time: 1.2e5 }
    );

    collector.on('collect', (reaction) => {
      try {
        if (reaction.emoji.name === emojis[0])
          page = page ? page - 1 : pages.length - 1;
        else page = page + 1 < pages.length ? page + 1 : 0;

        void reaction.users.remove(message.author.id);
        void current.edit(new EnhancedEmbed(pages[page]).setFooter(footer()));
      } catch (err) {
        void current.edit(
          message.embed("You're changing pages too fast!").setColor('RED')
        );
        void current.reactions.removeAll();
      }
    });

    collector.on('end', () =>
      current.deleted ? null : void current.reactions.removeAll()
    );

    return current;
  }
}
