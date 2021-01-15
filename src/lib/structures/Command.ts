import { Command, CommandOptions } from 'discord-akairo';
import { Message } from 'discord.js';

export default class JampbotCommand extends Command {
  public examples: string[];
  public hidden: boolean;
  public usage: string;

  public constructor(id: string, options: CommandOptions = {}) {
    options.args ||= [];
    super(id, options);

    if (typeof options.args !== 'function') {
      options.args ||= [];
      options.args.unshift({
        id: 'help',
        match: 'flag',
        flag: ['--help', '-h'],
        description: 'Shows help information of this command.',
      });
    }

    const exec = (message: Message, args: { help: boolean }) => {
      if (args.help) {
        this.handler.modules.get('help')?.exec(message, { command: this });
        return;
      }

      this.exec(message, args);
    };

    this.exec = exec;

    const { examples = [], hidden = false, usage = '' } = options;

    this.examples = examples;
    this.hidden = hidden;
    this.usage = usage;
  }
}
