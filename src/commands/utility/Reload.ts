import { CommandOptions, Argument, Listener, Inhibitor } from 'discord-akairo';
import type { Message } from 'discord.js';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  module: Command | Listener | Inhibitor;
}

@ApplyOptions<CommandOptions>('reload', {
  aliases: ['reload', 'refresh'],
  description: 'Reload a module',
  ownerOnly: true,
  args: [
    {
      id: 'module',
      match: 'text',
      type: Argument.union('commandAlias', 'listener', 'inhibitor'),
    },
  ],
})
export default class Reload extends Command {
  public run(message: Message, { module }: Args): void {
    if (!module) return message.error("You didn't provide a valid module!");

    try {
      module.reload();
      message.embed(
        `The "${
          module.id
        }" ${module.handler.classToHandle.name.toLowerCase()} was reloaded!`,
        true
      );
    } catch (e) {
      console.log(
        `There was an error when reloading the "${
          module.id
        }" ${module.handler.classToHandle.name.toLowerCase()}`
      );
      message.error('Something went wrong', `\`\`\`${e}\`\`\``);
    }
  }
}
