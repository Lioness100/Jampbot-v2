import { join } from 'path';
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import type { Guild, Message } from 'discord.js';
import { units } from '../utils/Constants';
import { JampbotUtil, logger } from '../utils';
import { TaskHandler, Database } from '.';

export default class JampbotClient extends AkairoClient {
  public logger = logger;

  public db = new Database();

  public util = new JampbotUtil(this);

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: join(__dirname, '../../commands'),
    defaultCooldown: 1e3,
    automateCategories: true,
    handleEdits: true,
    commandUtil: true,
    commandUtilLifetime: 6e4,
    commandUtilSweepInterval: 6e4,
    aliasReplacement: /-/g,
    argumentDefaults: {
      prompt: {
        retries: 3,
        retry: (message: Message) =>
          message
            .embed(`Invalid reply; please try again`)
            .setDescription(
              'You can respond with `cancel` to cancel the prompt'
            )
            .setColor('RED'),
        timeout: (message: Message) =>
          message.embed(`You ran out of time`).setColor('RED'),
        ended: (message: Message) =>
          message.embed(`Too many tries`).setColor('RED'),
        cancel: (message: Message) => message.embed(`Prompt Canceled`),
        modifyStart: (message: Message, text: unknown) =>
          typeof text === 'string'
            ? message
                .embed(text)
                .setDescription(
                  'You can respond with `cancel` to cancel the prompt'
                )
            : text,
        modifyRetry: (message: Message, text: unknown) =>
          typeof text === 'string'
            ? message
                .embed(text)
                .setDescription(
                  'Try again or respond with `cancel` to cancel the prompt'
                )
                .setColor('RED')
            : text,
      },
    },
  });

  public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, '../../inhibitors'),
  });

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '../../listeners'),
    automateCategories: true,
  });

  public taskHandler: TaskHandler = new TaskHandler(this, {
    directory: join(__dirname, '../../tasks'),
  });

  public constructor() {
    super({
      ownerID: '381490382183333899',
      presence: {
        activity: {
          type: 'PLAYING',
          name: 'Jamp Levels',
        },
      },
      disableMentions: 'everyone',
      messageCacheMaxSize: 1,
      messageEditHistoryMaxSize: 1,
      ws: {
        properties: {
          $browser: 'Discord Android',
        },
      },
      partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    });
  }

  public get guild(): Guild {
    return this.guilds.cache.get('699220238801174558')!;
  }

  public async start(): Promise<void> {
    await this.init();
    void this.login(process.env.TOKEN);
  }

  private async init() {
    this.logger.info('Starting up...');

    this.commandHandler
      .useInhibitorHandler(this.inhibitorHandler)
      .useListenerHandler(this.listenerHandler)
      .loadAll();

    this.commandHandler.resolver.addType(
      'duration',
      (message: Message, phrase: string) => {
        if (!phrase) return null;

        const regexString = Object.entries(units)
          .map(
            ([name, { label }]) =>
              String.raw`(?:(?<${name}>-?(?:\d+)?\.?\d+) *${label})?`
          )
          .join('\\s*');
        const match = new RegExp(`^${regexString}$`, 'i').exec(phrase);
        if (!match) return null;

        let milliseconds = 0;
        for (const key in match.groups) {
          const value = Number(match.groups[key] || 0);
          milliseconds += value * units[key].value;
        }

        return milliseconds;
      }
    );

    logger.info(`Loaded ${this.commandHandler.modules.size} commands`);

    this.inhibitorHandler.loadAll();
    logger.info(`Loaded ${this.inhibitorHandler.modules.size} inhibitors`);

    this.listenerHandler.setEmitters({
      process,
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });
    this.listenerHandler.loadAll();
    logger.info(`Loaded ${this.listenerHandler.modules.size} listeners`);

    this.taskHandler.loadAll();
    logger.info(`Loaded ${this.taskHandler.modules.size} tasks`);

    await this.db.init();
    logger.info('Established connection to database');
  }
}
