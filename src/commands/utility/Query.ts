import type { CommandOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import { Command, WolframApp } from '../../lib/structures';
import ApplyOptions from '../../lib/utils/ApplyOptions';

interface Args {
  query: string;
  advanced: boolean;
}

@ApplyOptions<CommandOptions>('query', {
  aliases: ['query', 'wolfram', 'calc', 'calculate', 'math'],
  description: 'Query wolfram alpha',
  usage: '<query> [--advanced]',
  examples: [
    'first president of usa',
    'sum 1/x^2 from x=1 to infinity --advanced',
  ],
  args: [
    {
      id: 'query',
      match: 'text',
      description: 'Query for wolfram alpha',
      default: '1 + 1',
    },
    {
      id: 'advanced',
      match: 'flag',
      flag: ['--advanced', '--a'],
      description: 'Include advanced information of your query',
    },
  ],
})
export default class Query extends Command {
  private wolfram = new WolframApp(process.env.WOLFRAM_APP_ID!);

  public async run(message: Message, { query, advanced }: Args): Promise<void> {
    const result = await this.wolfram.calculate(query);

    if (result.error) return void message.error("That's not a valid query");
    if (!result.success)
      return void message.error(
        'Wolfram Alpha did not find any results for your guery',
        result.didyoumeans && `Did you mean "${result.didyoumeans.val}"?`
      );

    const [
      input,
      {
        title,
        subpods: [output],
      },
      ...rest
    ] = result.pods!;

    const embed = message.embed(`Query Results`).addFields([
      { name: `${input.title}:`, value: input.subpods[0].plaintext },
      {
        name: `${title}:`,
        value: output.plaintext || "Check the embed's image",
      },
    ]);

    if (advanced)
      embed.addFields(
        rest
          .filter(({ subpods }) => subpods[0]?.plaintext)
          .map((pod) => ({
            name: `${pod.title}:`,
            value: pod.subpods[0].plaintext,
          }))
          .slice(0, 23)
      );

    if (output.img) embed.setImage(output.img.src);

    void message.util!.send(embed);
  }
}
