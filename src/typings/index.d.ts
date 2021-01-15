import type {
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
  CommandUtil,
} from 'discord-akairo';
import type {
  GuildMember,
  EmbedFieldData,
  MessageEmbedOptions,
} from 'discord.js';
import type { Response } from 'lib/utils/Constants';
import type { TaskHandler, Database, EnhancedEmbed } from '../lib/structures';
import type { Logger } from '../lib/utils/Logger';

declare module 'discord-akairo' {
  interface AkairoClient {
    logger: Logger;
    db: Database;
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    taskHandler: TaskHandler;
  }

  interface Command {
    blockedChannels?: string[];
    allowedChannels?: string[];
  }

  interface CommandOptions {
    examples?: string[];
    hidden?: boolean;
    usage?: string;
  }

  interface ClientUtil {
    getMemberInfo(member: GuildMember): EmbedFieldData[];
    embed(data?: MessageEmbedOptions): EnhancedEmbed;
    fetch(url: string): Promise<Response>;
  }
}

declare module 'discord.js' {
  interface Message {
    util: CommandUtil;
    embed(title?: string): EnhancedEmbed;
    error(message: string, explanation?: string): Promise<Message>;
  }
}
