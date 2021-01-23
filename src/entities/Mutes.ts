import { DocumentType, prop, ReturnModelType } from '@typegoose/typegoose';
import { formatDistanceToNowStrict } from 'date-fns';
import type { TextChannel } from 'discord.js';
import { channels } from '../lib/utils/Constants';
import type JampbotClient from '../lib/structures/JampbotClient';
import Entity from './Entity';

export default class Mutes extends Entity {
  @prop({ default: 0 })
  public previous!: number;

  @prop()
  public active?: {
    exec: string;
    reason: string;
    start: number;
    end?: number;
  };

  public startTimer(this: DocumentType<Mutes>, client: JampbotClient): void {
    client.setTimeout(
      () =>
        void (async () => {
          const member = await client.guild.members.fetch(this.id);
          if (!member || member.roles.cache.has('699370128889872414')) return;
          await member.roles.remove('699370128889872414');

          const exec = await client.users.fetch(this.active!.exec);

          const embed = client.util
            .embed()
            .personalize(member)
            .addFields(
              {
                name: 'Original Reason',
                value: this.active!.reason,
              },
              {
                name: 'Original Duration',
                value: formatDistanceToNowStrict(this.active!.start),
              }
            )
            .setFooter(
              `Originally muted by ${exec.tag}`,
              exec.displayAvatarURL()
            )
            .setTimestamp();

          void member.send(
            embed
              .setTitle(`You have been unmuted`)
              .setDescription(
                'Please discontinue the behavior that led to your mute'
              )
          );

          void (client.guild.channels.cache.get(
            channels.log
          ) as TextChannel).send(
            embed.setTitle(`${member.user.tag} has been unmuted`)
          );
        })(),
      this.active!.end! - Date.now()
    );
  }

  public static async startTimers(
    this: ReturnModelType<typeof Mutes>,
    client: JampbotClient
  ): Promise<void> {
    const mutes = await this.find({
      active: { $exists: true },
    });

    mutes
      .filter((mute) => mute.active!.end)
      .forEach((mute) => mute.startTimer(client));
  }
}
