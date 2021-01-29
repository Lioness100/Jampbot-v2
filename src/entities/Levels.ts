import { DocumentType, prop, ReturnModelType } from '@typegoose/typegoose';
import type JampbotClient from '../lib/structures/JampbotClient';
import { Leaderboard } from '../lib/utils/Constants';
import Entity from './Entity';

export default class Levels extends Entity {
  @prop({ default: 0 })
  public xp!: number;

  @prop({ default: 0 })
  public level!: number;

  public static levelFor(xp: number): number {
    return ~~(0.1 * Math.sqrt(xp));
  }

  public static xpFor(level: number): number {
    return level ** 2 * 100;
  }

  public static async calculateLeaderboard(
    this: ReturnModelType<typeof Levels>,
    client: JampbotClient,
    limit: number
  ): Promise<Leaderboard[]> {
    const leaderboard = await this.find({})
      .limit(limit)
      .sort([['xp', 'descending']])
      .exec();

    return Promise.all(
      leaderboard.map(async ({ id, xp, level }, idx) => ({
        xp,
        level,
        position: idx + 1,
        tag: (await client.users.fetch(id)).tag || 'Unkown#0000',
      }))
    );
  }

  public async append(
    this: DocumentType<Levels>,
    xp: number
  ): Promise<boolean> {
    this.xp += xp;
    this.level = Levels.levelFor(this.xp);
    await this.save().catch((err) =>
      this.logger.error('Error appending user xp: ', err)
    );
    return Levels.levelFor(this.xp - xp) < this.level;
  }
}
