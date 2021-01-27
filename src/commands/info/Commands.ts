import type { CommandOptions } from 'discord-akairo';
import type { Message, EmbedFieldData } from 'discord.js';
import { commaListsAnd } from 'common-tags';
import { categories } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  command?: Command;
}

@ApplyOptions<CommandOptions>('commands', {
  aliases: ['commands', 'help++'],
  description: 'View all of the commands',
  usage: '[command]',
  args: [
    {
      id: 'command',
      type: 'commandAlias',
      description: 'The specific command to view, if any',
    },
  ],
})
export default class Commands extends Command {
  public async run(message: Message, { command }: Args): Promise<unknown> {
    if (!command) {
      const embeds = this.handler.categories.map((category) =>
        message
          .embed(
            `${categories[category.id]} ${this.client.util.upper(
              category.id
            )} Commands`
          )
          .setColor('RANDOM')
          .setDescription(
            category
              .filter((command) => !command.hidden)
              .map(
                (command) =>
                  `**${this.client.util.upper(command.id)}**\n\`!${
                    command.id
                  } ${command.usage || ''}\`\n${command.description}`
              )
              .join('\n\n')
          )
      );
      await message.author.send(
        message
          .embed(`All Jampbot Commands`)
          .setDescription(
            "If you want a more detailed look at any command, you can use `!commands <command>` or `!<command> --help`\n\nRemember that Everything inside <> is required, and everything inside [] is optional. Don't include these symbols in the actual command"
          )
      );
      await Promise.all(embeds.map((embed) => message.author.send(embed)));
      return message.react('👍');
    } else {
      if (command.hidden) return message.error(`This command is hidden 🙈`);
      await message.author.send(
        message
          .embed(`Help for \`!${command.id}\``)
          .addFields(
            [
              {
                name: 'Category',
                value: this.client.util.upper(command.categoryID),
              },
              command.aliases.length > 1 && {
                name: 'Aliases',
                value: commaListsAnd`${this.inline(command.aliases)}`,
              },
              Array.isArray(command.argDescriptions) && {
                name: `Arguments: ${command.argDescriptions.length}`,
                value: command.argDescriptions
                  .map(
                    (arg) =>
                      `> Descriptor: \`${arg.id}\`\n${
                        arg.type
                          ? `Type: ${
                              typeof arg.type === 'string' ? arg.type : 'custom'
                            }\n`
                          : ''
                      }${
                        !['function', 'undefined'].includes(typeof arg.default)
                          ? `> Default: ${arg.default}\n`
                          : ''
                      }${
                        arg.flag
                          ? commaListsAnd`> Flag Alias(es): ${this.inline(
                              [arg.flag].flat()
                            )}\n`
                          : ''
                      }${
                        arg.description
                          ? `> Description: ${arg.description}\n`
                          : ''
                      }`
                  )
                  .join('\n'),
              },
              {
                name: 'Usage',
                value: `\`\`\`\n!${command.id} ${command.usage || ''}\n\`\`\``,
              },
              command.examples && {
                name: 'Example(s)',
                value: command.examples
                  .map((example) => `\`\`\`\n!${command.id} ${example}\n\`\`\``)
                  .join('\n'),
              },
              command.cooldown &&
                command.cooldown !== 1000 && {
                  name: 'Cooldown',
                  value: `${command.ratelimit} every ${
                    command.cooldown * 1000
                  }s`,
                },
              Array.isArray(command.userPermissions) && {
                name: 'Permission(s) Required',
                value: commaListsAnd`${this.inline(
                  command.userPermissions as string[]
                )}`,
              },
            ].filter(Boolean) as EmbedFieldData[]
          )
          .setDescription(command.description || 'No description provided')
      );
      void message.react('👍');
    }
  }

  private inline(array: string[]) {
    return array.map((str) => `\`${str}\``);
  }
}
