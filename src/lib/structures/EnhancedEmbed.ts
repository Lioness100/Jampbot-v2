import { MessageEmbed, User, GuildMember } from 'discord.js';

export default class EnhancedEmbed extends MessageEmbed {
  public personalize(person: User | GuildMember): this {
    const user = person instanceof GuildMember ? person.user : person;
    this.setAuthor(user.username, user.displayAvatarURL());
    if (person instanceof GuildMember) this.setColor(person.displayHexColor);
    return this;
  }
}
