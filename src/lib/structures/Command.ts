import {
  Command,
  CommandOptions,
  ArgumentOptions,
  ArgumentGenerator,
} from 'discord-akairo';
import { Message } from 'discord.js';

interface Args {
  help: boolean;
}

export default abstract class JampbotCommand extends Command {
  public examples?: string[];
  public hidden?: boolean;
  public usage?: string;
  public args: ArgumentOptions[] | ArgumentGenerator;

  public constructor(id: string, options: CommandOptions = {}) {
    const { examples, hidden, usage, args = [] } = options;

    if (Array.isArray(args)) {
      args.unshift({
        id: 'help',
        match: 'flag',
        flag: ['--help', '--h'],
        description: 'Shows help information of this command.',
      });
    }

    super(id, { ...options, args });

    this.args = Array.isArray(args) ? args.slice(1) : args;
    this.examples = examples;
    this.hidden = hidden;
    this.usage = usage;
  }

  public exec(message: Message, args: Args): unknown {
    if (args.help)
      return this.handler.modules
        .get('commands')
        ?.exec(message, { command: this });

    this.run(message, args);
  }

  public abstract run(message: Message, args: unknown): unknown;
}
