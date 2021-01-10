import { inspect } from 'util';
import { CommandOptions, Command } from 'discord-akairo';
import { Message, MessageEmbed, Util } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';

interface Args {
  code: string;
  silent: boolean;
}

@ApplyOptions<CommandOptions>('eval', {
  aliases: ['eval'],
  description: '',
  category: 'eval',
  ownerOnly: true,
  args: [
    { id: 'code', match: 'text' },
    { id: 'silent', match: 'flag', flag: ['--s', '--silent'] },
  ],
})
export default class Eval extends Command {
  public async exec(message: Message, args: Args): Promise<void> {
    let error: string;
    let result: string;
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
      error = err.toString();
    } finally {
      if (args.silent) {
        if (error) this.client.logger.info('Eval error: ', error);
        return void message.delete();
      }

      void message.channel.send(
        new MessageEmbed()
          .setColor(error ? 'RED' : 'GREEN')
          .setAuthor("Lioness' Eval Results", message.author.displayAvatarURL())
          .addFields([
            { name: 'Input:', value: `\`\`\`js\n${args.code}\n\`\`\`` },
            {
              name: 'Output:',
              value: `\`\`\`js\n${
                error ||
                (result.length > 1016
                  ? `The output's too large!`
                  : Util.escapeCodeBlock(result))
              }\n\`\`\``,
            },
          ])
      );
    }
  }
}
