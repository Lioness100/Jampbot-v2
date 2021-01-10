import {
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from 'discord-akairo';
import Database from '../lib/structures/Database';
import { Logger } from '../lib/utils/Logger';

declare module 'discord-akairo' {
  interface AkairoClient {
    logger: Logger;
    db: Database;
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
  }
}

declare module 'discord.js' {
  interface Message {
    embed(title?: string): MessageEmbed;
    error(message: string, explanation?: string): Promise<Message>;
  }
}
