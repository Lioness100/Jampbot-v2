import { Argument, ArgumentOptions, CommandOptions } from 'discord-akairo';
import type { Message, TextChannel, User } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  limit: number;
  before: Message;
  after?: Message;
  user?: User;
}

@ApplyOptions<CommandOptions>('purge', {
  aliases: ['purge'],
  description: 'Bulk delete a number of messages',
  usage:
    '<number | [number] --until <message id>> [--before <message id>] [--user <user>]',
  examples: ['20 general cleanup', '--until 800184375006330900'],
  channel: 'guild',
  userPermissions: ['MANAGE_MESSAGES'],
  argDescriptions: [
    {
      id: 'amount',
      type: 'number',
      description:
        'The number of messages to delete (not including the command) between 2 and 100. Can only delete messages up to 2 weeks old. This is optional if using the `--until` flag',
    },
    {
      id: 'until',
      type: 'message',
      flag: ['--until', '--until='],
      description:
        'This flag accepts a message ID, and the `amount` arg is optional if this is present. Delete the the amount of messages specified *or* 100 ***or*** until the message provided (whichever comes first)',
    },
    {
      id: 'before',
      type: 'message',
      flag: ['--before', '--before='],
      description:
        'The message ID to start the purge at (delete x amount of messages that were sent *before*)',
    },
    {
      id: 'user',
      type: 'user',
      flag: ['--user', '--user='],
      description: 'The user to delete messages from, if any',
    },
  ],
  *args(
    message: Message
  ): Generator<
    ArgumentOptions,
    Args & { help: boolean },
    Message & User & undefined & number & string & boolean
  > {
    const help: boolean = yield {
      match: 'flag',
      flag: ['--h', '--help'],
    };

    const after: Message | undefined = yield {
      type: 'message',
      match: 'option',
      flag: ['--until', '--until='],
      prompt: {
        retry: 'Please provide a valid message ID',
        optional: true,
      },
    };

    const limit: number | undefined = yield {
      type: Argument.range('number', 2, 100, true),
      prompt: {
        start:
          'How many messages would you like to delete between 2 and 100? (not including your command and this prompt)',
        retry: 'Please choose a valid number between 2 and 100 (inclusive)',
        optional: !!after,
      },
      default: after && 100,
    };

    const before: Message = yield {
      type: 'message',
      match: 'option',
      flag: ['--before', '--before='],
      default: message,
      prompt: {
        retry: 'Please provide a valid message ID',
        optional: true,
      },
    };

    const user: User = yield {
      type: 'user',
      match: 'option',
      flag: ['--user', '--user='],
      prompt: {
        retry: 'Please provide a valid user ID',
        optional: true,
      },
    };

    return { limit, after, before, user, help };
  },
})
export default class Purge extends Command {
  public async run(
    message: Message,
    { limit, after, before, user }: Args
  ): Promise<void> {
    let messages = await (message.channel as TextChannel).messages.fetch({
      limit,
      before: before.id,
      after: after && after.id,
    });

    if (user) messages = messages.filter((msg) => msg.author.id === user.id);

    if (!messages.size)
      return message.error(
        'There are no messages fitting the provided constraints'
      );

    const { size } = await (message.channel as TextChannel).bulkDelete(
      messages,
      true
    );

    message.embed(
      `${
        size === messages.size
          ? `${size} messages were`
          : `Only ${size} messages could be`
      } deleted`,
      true
    );

    setTimeout(
      () =>
        void (async () => {
          void (message.channel as TextChannel).bulkDelete([
            ...(await message.channel.messages.fetch({ after: message.id }))
              .filter((msg) =>
                [message.author.id, this.client.user!.id].includes(
                  msg.author.id
                )
              )
              .map((msg) => msg.id),
            message.id,
          ]);
        })(),
      5000
    );
  }
}
