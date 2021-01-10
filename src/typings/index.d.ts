import {
  CommandHandler,
  ListenerHandler,
  InhibitorHndler,
} from 'discord-akairo';
import Database from '../lib/structures/Database';
import EnhancedEmbed from '../lib/structures/EnhancedEmbed';
import { Logger } from '../lib/utils/Logger';

declare module 'discord-akairo' {
  interface AkairoClient {
    logger: Logger;
    db: Database;
  }
}

declare module 'discord.js' {
  interface Message {
    embed(title?: string): EnhancedEmbed;
    error(message: string, explanation?: string): Promise<Message>;
  }
}
