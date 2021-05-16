declare module 'discord-akairo' {
  interface AkairoClient {
    logger: import('../lib/utils/Logger').Logger;
    db: import('../lib/structures/Database').default;
    commandHandler: import('discord-akairo').CommandHandler;
    listenerHandler: import('discord-akairo').ListenerHandler;
    inhibitorHandler: import('discord-akairo').InhibitorHandler;
    taskHandler: import('../lib/structures/TaskHandler').default;
    guild: import('discord.js').Guild;
  }

  interface Command {
    blockedChannels?: string[] | 'default';
    allowedChannels?: string[];
    examples?: string[];
    hidden?: boolean;
    usage?: string;
    argDescriptions: import('discord-akairo').ArgumentOptions[];
  }

  interface CommandOptions {
    blockedChannels?: string[] | 'default';
    allowedChannels?: string[];
    argDescriptions?: import('discord-akairo').ArgumentOptions[];
    examples?: string[];
    hidden?: boolean;
    usage?: string;
  }

  interface ClientUtil {
    getMemberInfo(
      member: GuildMember
    ): Promise<import('discord.js').EmbedFieldData[]>;
    embed(
      data?: MessageEmbedOptions
    ): import('../lib/structures/EnhancedEmbed').default;
    fetch(
      url: string,
      headers?: Record<string, string>
    ): Promise<import('../lib/utils/Constants').Response>;
    progressBar(value: number, max: number): string;
    upper(string: string): string;
    chunk<T>(arr: T[], size: number): T[][];
    ordinal(num: number): string;
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
    reactAll(...emojis: import('discord.js').EmojiResolvable[]): Promise<void>;
  }
}

declare module 'colorthief' {
  export function getColor(image: string): Promise<[number, number, number]>;
}

declare module 'deepai' {
  interface TextGeneratorParams {
    text: string;
  }

  interface TextGeneratorResult {
    id: string;
    output: string;
  }

  export function setApiKey(key: string): void;
  export function callStandardApi(
    api: 'text-generator',
    params: TextGeneratorParams
  ): Promise<TextGeneratorResult>;
}

declare module 'coolstory.js' {
  export function title(): string;
}
