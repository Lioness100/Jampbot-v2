import type {
  EmbedFieldData,
  GuildMember,
  MessageEmbedOptions,
} from 'discord.js';
import { ClientUtil } from 'discord-akairo';
import { format, formatDistanceToNow } from 'date-fns';
import fetch, { FetchError } from 'node-fetch';
import { JampbotClient, EnhancedEmbed } from '../structures';
import { roles, Response } from './Constants';

export default class JampbotUtil extends ClientUtil {
  constructor(client: JampbotClient) {
    super(client);
  }

  public embed(data?: MessageEmbedOptions): EnhancedEmbed {
    return new EnhancedEmbed(data);
  }

  public getMemberInfo(member: GuildMember): EmbedFieldData[] {
    return [
      {
        name: 'Member Joined:',
        value: member.joinedAt
          ? `${format(
              member.joinedAt,
              'd MMM yyyy, h:mm a'
            )} (${formatDistanceToNow(member.joinedAt)} ago)`
          : 'Unknown',
      },
      {
        name: 'Account Created:',
        value: `${format(
          member.user.createdAt,
          'd MMM yyyy, h:mm a'
        )} (${formatDistanceToNow(member.user.createdTimestamp)} ago)`,
      },
      {
        name: 'Verified:',
        value: this.upper(member.roles.cache.has(roles.member).toString()),
      },
      {
        name: 'Jamp Rank:',
        value:
          member.roles.cache.find(({ name }) => /Jamper$/.test(name))?.name ??
          'Unranked',
      },
      {
        name: 'EXP:',
        value: 'TODO',
      },
    ];
  }

  public fetch(
    url: string,
    headers?: Record<string, string>
  ): Promise<Response> {
    return fetch(url, headers && { headers })
      .then(async (res) => {
        const isJson = res.headers
          .get('content-type')
          ?.split(';')
          .some((t) => t === 'application/json');
        return {
          status: res.status,
          headers: res.headers,
          body: (await (isJson ? res.json() : res.buffer())) as
            | Buffer
            | Record<string, unknown>,
        };
      })
      .catch((error: FetchError) => {
        this.client.logger.error(error);
        return {
          status: -1,
          text: error.toString(),
        };
      });
  }

  public progressBar(value: number, max: number): string {
    const percentage = value / max;
    const progress = Math.round(12 * percentage);

    const progressText = '<:green:804506477905182781>'.repeat(progress);
    const emptyProgressText = '<:red:804506508682461194>'.repeat(12 - progress);
    const percentageText = `${Math.round(percentage * 100)}%`;

    return `${progressText}${emptyProgressText} ${percentageText}`;
  }

  public upper(string: string): string {
    return string[0].toUpperCase() + string.slice(1);
  }

  public sample<T>(arr: T[]): T {
    return arr[~~(Math.random() * arr.length)];
  }

  public chunk<T>(arr: T[], size: number): T[][] {
    return [
      ...(Array(Math.ceil(arr.length / size)) as undefined[]),
    ].map((_, i) => arr.slice(size * i, size + size * i));
  }

  public ordinal(num: number): string {
    return `${num}${
      [, 'st', 'nd', 'rd'][(num / 10) % 10 ^ 1 && num % 10] || 'th'
    }`;
  }

  public tap<T>(value: T): T {
    this.client.logger.debug(value);
    return value;
  }
}
