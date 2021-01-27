import { Command, CommandOptions, ArgumentOptions } from 'discord-akairo';
import { Message } from 'discord.js';

interface Args {
  help: boolean;
}

export default abstract class JampbotCommand extends Command {
  public examples?: string[];
  public hidden?: boolean;
  public usage?: string;
  public argDescriptions: ArgumentOptions[];

  public constructor(id: string, options: CommandOptions = {}) {
    const { examples, hidden, usage, args = [], argDescriptions } = options;

    if (Array.isArray(args)) {
      args.unshift({
        id: 'help',
        match: 'flag',
        flag: ['--help', '--h'],
        description: 'Shows help information of this command.',
      });
    }

    super(id, { ...options, args });

    this.argDescriptions =
      argDescriptions || (args as ArgumentOptions[]).slice(1);
    this.examples = examples;
    this.hidden = this.ownerOnly || hidden;
    this.usage = usage;
  }

  public exec(message: Message, args: Args): void {
    if (args.help)
      this.handler.modules.get('commands')?.exec(message, { command: this });
    else
      Promise.resolve(this.run(message, args)).catch((err: Error) => {
        this.client.listenerHandler.modules
          .get('error')!
          .exec(err, message, this);
      });
  }

  public abstract run(message: Message, args: unknown): unknown;
}
