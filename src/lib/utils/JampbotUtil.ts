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
        value: member.roles.cache.has(roles.member),
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

  public fetch(url: string): Promise<Response> {
    return fetch(url)
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
}
