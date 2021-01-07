import Database from '../lib/structures/Database';
import { Logger } from '../lib/utils/Logger';

declare module 'discord-akairo' {
  interface AkairoClient {
    logger: Logger;
    db: Database;
  }
}

declare module 'discord.js' {
  interface Message {
    embed(title?: string): MessageEmbed;
    error(message: string, explanation?: string): Promise<Message>;
  }
}
