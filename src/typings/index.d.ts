/* eslint-disable import/order */
declare module 'discord-akairo' {
  interface AkairoClient {
    logger: import('../lib/utils/Logger').Logger;
    db: import('../lib/structures/Database').default;
    commandHandler: import('discord-akairo').CommandHandler;
    listenerHandler: import('discord-akairo').ListenerHandler;
    inhibitorHandler: import('discord-akairo').InhibitorHandler;
    taskHandler: import('discord-akairo').TaskHandler;
  }

  interface Command {
    blockedChannels?: string[] | 'default';
    allowedChannels?: string[] | 'default';
    examples?: string[];
    hidden?: boolean;
    usage?: string;
    args:
      | import('discord-akairo').ArgumentOptions[]
      | import('discord-akairo').ArgumentGenerator;
  }

  interface CommandOptions {
    blockedChannels?: string[] | 'default';
    allowedChannels?: string[] | 'default';
    examples?: string[];
    hidden?: boolean;
    usage?: string;
  }

  interface ClientUtil {
    getMemberInfo(member: GuildMember): import('discord.js').EmbedFieldData[];
    embed(
      data?: MessageEmbedOptions
    ): import('../lib/structures/EnhancedEmbed').default;
    fetch(url: string): Promise<import('../lib/utils/Constants').Response>;
    upper(string: string): string;
    sample<T>(arr: T[]): T;
    tap<T>(value: T): T;
  }
}

declare module 'discord.js' {
  interface Message {
    util: import('discord-akairo').CommandUtil;
    embed(title?: string): import('../lib/structures/EnhancedEmbed').default;
    error(
      message: string,
      explanation?: string
    ): Promise<import('discord.js').Message>;
  }
}

declare module 'colorthief' {
  export function getColor(image: string): Promise<[number, number, number]>;
}
