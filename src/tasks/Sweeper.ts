import { BaseManager, Guild } from 'discord.js';
import { AkairoClient } from 'discord-akairo';
import { measures } from '../lib/utils/Constants';
import { Task, TaskOptions } from '../lib/structures/Task';
import ApplyOptions from '../lib/utils/ApplyOptions';

const stats: Record<string, number> = {
  presences: 0,
  members: 0,
  channels: 0,
  emojis: 0,
  roles: 0,
  guilds: 0,
  users: 0,
  voiceStates: 0,
};

@ApplyOptions<TaskOptions>('sweeper', { rule: measures.daily })
export default class Sweeper extends Task {
  public exec(): void {
    this.client.guilds.cache.each((guild) => {
      this.clear(guild, 'presences');
      this.clear(guild, 'members');
      this.clear(guild, 'voiceStates');
    });

    this.clear(this.client, 'channels');
    this.clear(this.client, 'emojis');
    this.clear(this.client, 'users');

    this.client.logger.info(
      `Sweeped ${Object.entries(stats)
        .map(([manager, amount]) => `${amount} ${manager.replace(/s$/, '(s)')}`)
        .join(', ')}`
    );
  }

  private clear(structure: Guild | AkairoClient, manager: string) {
    const { cache } = ((structure as unknown) as Record<string, unknown>)[
      manager
    ] as BaseManager<unknown, unknown, unknown>;
    stats[manager] += cache.size;
    cache.clear();
  }
}
