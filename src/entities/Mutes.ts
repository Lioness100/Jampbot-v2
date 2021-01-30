import { DocumentType, prop, ReturnModelType } from '@typegoose/typegoose';
import { formatDistanceToNowStrict } from 'date-fns';
import type { TextChannel } from 'discord.js';
import type { AkairoClient } from 'discord-akairo';
import { channels } from '../lib/utils/Constants';
import type JampbotClient from '../lib/client/JampbotClient';
import Entity from './Entity';

export default class Mutes extends Entity {
  @prop({ default: 0 })
  public previous!: number;

  @prop()
  public active?: {
    exec: string;
    reason: string;
    start: number;
    duration?: number;
  };

  public startTimer(this: DocumentType<Mutes>, client: AkairoClient): void {
    client.setTimeout(() => void this.unmute(client), this.active!.duration!);
  }

  public async unmute(
    this: DocumentType<Mutes>,
    client: AkairoClient,
    reason = 'No reason Provided'
  ): Promise<void> {
    const member = await client.guild.members.fetch(this.id);
    if (!member || member.roles.cache.has('699370128889872414')) return;
    await member.roles.remove('699370128889872414');

    const exec = await client.users.fetch(this.active!.exec);

    const embed = client.util
      .embed()
      .personalize(member)
      .addFields(
        {
          name: 'Mute Reason',
          value: this.active!.reason,
        },
        {
          name: 'Unmute Reason',
          value: reason,
        },
        {
          name: 'Duration',
          value: formatDistanceToNowStrict(this.active!.start),
        }
      )
      .setFooter(`Originally muted by ${exec.tag}`, exec.displayAvatarURL())
      .setTimestamp();

    try {
      void member.send(
        embed
          .setTitle(`You have been unmuted`)
          .setDescription(
            'Please discontinue the behavior that led to your mute'
          )
      );
    } catch (err) {
      // do nothing
    }

    void (client.guild.channels.cache.get(channels.log) as TextChannel).send(
      embed.setTitle(`${member.user.tag} has been unmuted`)
    );

    this.active = undefined;
    await this.save();
  }

  public static async startTimers(
    this: ReturnModelType<typeof Mutes>,
    client: JampbotClient
  ): Promise<void> {
    const mutes = await this.find({
      active: { $exists: true },
    });

    mutes
      .filter((mute) => mute.active!.duration)
      .forEach((mute) => mute.startTimer(client));
  }
}
