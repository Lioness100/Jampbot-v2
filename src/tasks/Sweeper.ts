import { BaseManager, Guild } from 'discord.js';
import { AkairoClient } from 'discord-akairo';
import { measures } from '../lib/utils/Constants';
import { Task, TaskOptions } from '../lib/structures/Task';
import ApplyOptions from '../lib/utils/ApplyOptions';

@ApplyOptions<TaskOptions>('sweeper', { rule: measures.daily })
export default class Sweeper extends Task {
  public exec(): void {
    const stats = {
      presences: 0,
      members: 0,
      channels: 0,
      emojis: 0,
      roles: 0,
      guilds: 0,
      users: 0,
      voiceStates: 0,
    };

    const clear = (structure: Guild | AkairoClient, manager: string) => {
      const { cache } = structure[manager] as BaseManager<
        unknown,
        unknown,
        unknown
      >;
      stats[manager] += cache.size;
      cache.clear();
    };

    this.client.guilds.cache.each((guild) => {
      clear(guild, 'presences');
      clear(guild, 'members');
      clear(guild, 'roles');
      clear(guild, 'voiceStates');
    });

    clear(this.client, 'channels');
    clear(this.client, 'emojis');
    clear(this.client, 'guilds');
    clear(this.client, 'users');

    this.client.logger.info(
      `Sweeped ${Object.entries(stats)
        .map(([manager, amount]) => `${amount} ${manager.replace(/s$/, '(s)')}`)
        .join(', ')}`
    );
  }
}
