import { inspect } from 'util';
import type { CommandOptions } from 'discord-akairo';
import { Message, MessageEmbed, Util } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  code: string;
  silent: boolean;
}

@ApplyOptions<CommandOptions>('eval', {
  aliases: ['eval', 'evaluate'],
  description: 'Evaluate Javascript code',
  ownerOnly: true,
  hidden: true,
  args: [
    { id: 'code', match: 'text' },
    { id: 'silent', match: 'flag', flag: ['--s', '--silent'] },
  ],
})
export default class Eval extends Command {
  public async run(message: Message, args: Args): Promise<void> {
    let error = false;
    let result = '';
    try {
      result = Util.escapeCodeBlock(
        inspect(
          await (eval(
            `(async () => {${args.code}})()`
          ) as Promise<unknown>).catch((err) => {
            throw err;
          })
        )
      );
    } catch (err: unknown) {
      error = true;
      result = `${err}`;
    } finally {
      if (args.silent) {
        if (error) this.client.logger.info('Eval error: ', result);
        return void message.delete();
      }

      void message.util!.send(
        new MessageEmbed()
          .setColor(error ? 'RED' : 'GREEN')
          .setAuthor("Lioness' Eval Results", message.author.displayAvatarURL())
          .addFields([
            { name: 'Input:', value: `\`\`\`js\n${args.code}\n\`\`\`` },
            {
              name: 'Output:',
              value: `\`\`\`js\n${
                result.length > 1024
                  ? `${result.slice(0, 1021)}...`
                  : Util.escapeCodeBlock(result)
              }\n\`\`\``,
            },
          ])
      );
    }
  }
}
