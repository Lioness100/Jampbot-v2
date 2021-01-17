import { exec } from 'child_process';
import type { CommandOptions } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  command: string;
  silent: boolean;
}

@ApplyOptions<CommandOptions>('exec', {
  aliases: ['exec', 'execute', 'shell'],
  description: 'Execute command in the shell',
  ownerOnly: true,
  args: [
    { id: 'command', match: 'text', default: 'echo "no command specified"' },
    { id: 'silent', match: 'flag', flag: ['--s', '--silent'] },
  ],
})
export default class Exec extends Command {
  public run(message: Message, { command, silent }: Args): void {
    exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
      if (silent) {
        void message.delete();
        return stdout
          ? process.stdout.write(stdout)
          : process.stderr.write(stderr);
      }
      void message.util!.send(
        message.embed('Execution Results').addFields([
          { name: 'Command:', value: this.sh(`$ ${command}`) },
          { name: 'Stdout:', value: this.sh(stdout || 'No stdout') },
          { name: 'Stderr:', value: this.sh(stderr || 'No stderr') },
          { name: 'Exit Code:', value: this.sh(error?.code ?? 'No exit code') },
        ])
      );
    });
  }

  private sh(code: string | number) {
    return `\`\`\`sh\n${code}\n\`\`\``;
  }
}
