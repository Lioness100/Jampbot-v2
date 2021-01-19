declare module 'discord-akairo' {
  interface AkairoClient {
    logger: import('../lib/utils/Logger').Logger;
    db: import('../lib/structures/Database').default;
    commandHandler: import('discord-akairo').CommandHandler;
    listenerHandler: import('discord-akairo').ListenerHandler;
    inhibitorHandler: import('discord-akairo').InhibitorHandler;
    taskHandler: import('../lib/structures/TaskHandler').default;
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
    embed(
      title?: string,
      send:
        | boolean
        | ((
            embed: import('../lib/structures/EnhancedEmbed').default
          ) => unknown) = false,
      useUtil = true
    ): import('../lib/structures/EnhancedEmbed').default;
    error(message: string, explanation?: string, useUtil = true): void;
  }
}

declare module 'colorthief' {
  export function getColor(image: string): Promise<[number, number, number]>;
}
