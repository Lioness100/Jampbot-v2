import { join } from 'path';
import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from 'discord-akairo';
import { logger } from './utils/Logger';
import TaskHandler from './structures/TaskHandler';
import Database from './structures/Database';

export default class JampbotClient extends AkairoClient {
  public logger = logger;

  public db = new Database();

  public commandHandler = new CommandHandler(this, {
    directory: join(__dirname, '..', 'commands'),
    prefix: '!',
    allowMention: true,
    defaultCooldown: 1000,
    automateCategories: true,
  });

  public inhibitorHandler = new InhibitorHandler(this, {
    directory: join(__dirname, '..', 'inhibitors'),
  });

  public listenerHandler = new ListenerHandler(this, {
    directory: join(__dirname, '..', 'listeners'),
    automateCategories: true,
  });

  public taskHandler = new TaskHandler(this, {
    directory: join(__dirname, '..', 'tasks'),
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
    });
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
