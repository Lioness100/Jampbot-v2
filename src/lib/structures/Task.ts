import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import { scheduleJob } from 'node-schedule';

export interface TaskOptions extends AkairoModuleOptions {
  rule: string;
}

export abstract class Task extends AkairoModule {
  public constructor(id: string, options: TaskOptions) {
    super(id, options);
    scheduleJob(options.rule, (fireDate: Date) => {
      this.client.logger.debug(`Executed task: ${id}`);
      this.exec(fireDate);
    });
  }

  public abstract exec(fireDate: Date): void;
}
