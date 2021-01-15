import { MessageEmbed, User, GuildMember } from 'discord.js';

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
}
