import type { CommandOptions } from 'discord-akairo';
import type { Message, MessageReaction, User } from 'discord.js';
import { levelData, emotes } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import Command from '../../lib/structures/Command';

interface Args {
  style?: string;
}

interface Chosen {
  style: string;
  theme: string;
  others: string[];
}

@ApplyOptions<CommandOptions>('level-idea', {
  aliases: ['level-idea', 'makers-block'],
  description: 'Review an auto-generated level idea',
  blockedChannels: 'default',
  args: [
    {
      id: 'style',
      match: 'flag',
      flag: ['--style', '--style='],
      description: 'Specifically look for ideas for a chosen game styles',
    },
  ],
})
export default class LevelIdea extends Command {
  public async run(message: Message, { style }: Args): Promise<void> {
    if (style && !(levelData.styles as string[]).includes(style))
      return void message.error(`"${style}" is not a style!`);

    const idea = () =>
      message.embed(
        `I think you should create a ${this.getRandomIdea(style)} ${emotes.pog}`
      );

    const sent = await message.channel.send(idea());
    const selfReact = await sent.react('🔁');

    const collector = sent.createReactionCollector(
      (reaction: MessageReaction, user: User) =>
        reaction.emoji.name === '🔁' && user.id === message.author.id,
      { time: 6e4 }
    );

    collector.on('collect', (reaction: MessageReaction) => {
      void reaction.users.remove(message.author.id);
      void sent.edit(idea());
    });

    collector.on('end', () => {
      void selfReact.remove();
    });
  }

  private getRandomIdea = (style?: string) => {
    const chosen: Chosen = {
      style: '',
      theme: '',
      others: [],
    };

    if (Math.random() > 0.7) {
      chosen.style =
        style || this.client.util.sample(levelData.styles as string[]);
      this.filterElement([chosen.style]);
    }

    if (Math.random() > 0.9) {
      chosen.theme = this.client.util.sample(levelData.themes as string[]);
      if (chosen.theme === 'Ground')
        delete (levelData.powerups as Record<string, string[]>)[
          'the Rotten Mushroom'
        ];
    }

    const num =
      !(chosen.style || chosen.theme) || Math.random() < 0.9
        ? ~~(Math.random() * 3 + 1)
        : 0;

    const others = [];

    for (let i = 0; i < num; i++) {
      others.push(
        Math.random() > 0.8
          ? 'powerups'
          : Math.random() > 0.5
          ? 'gizmos'
          : 'enemies'
      );
    }

    for (let i = 0; i < others.length; i++) {
      const vals = Object.keys(levelData[others[i]]);
      const o = this.client.util.sample(vals);
      this.filterElement((levelData[others[i]] as Record<string, string[]>)[o]);
      delete (levelData[others[i]] as Record<string, string[]>)[o];
      chosen.others.push(o);
    }
    let chosenString: string[] | string = [];
    if (chosen.style) {
      chosenString.push(chosen.style);
    }
    if (chosen.theme) {
      chosenString.push(`Night ${chosen.theme}`);
    }
    if (chosenString.length) {
      chosenString = `${chosenString.join(' ')} `;
    } else {
      chosenString = '';
    }

    let chosenString2: string[] | string = [];
    if (chosen.others) {
      chosenString2 = chosenString2.concat(chosen.others);
    }
    if (chosenString2.length) {
      chosenString2 = ` with ${chosenString2.join(', ')}`;
    } else {
      chosenString2 = '';
    }
    return `${chosenString}Jamp level${chosenString2}`.replace(
      /,(?=[^,]*$)/,
      ' and'
    );
  };

  private filterElement(styles: string[]) {
    const elements = ['powerups', 'enemies', 'gizmos'];
    for (let element = 0; element < elements.length; element++) {
      for (const chosenStyle in levelData[elements[element]]) {
        let shared = false;
        for (let style = 0; style < styles.length; style++) {
          if (
            (levelData[elements[element]] as Record<string, string[]>)[
              chosenStyle
            ].includes(styles[style])
          )
            shared = true;
        }
        if (!shared)
          delete (levelData[elements[element]] as Record<string, string[]>)[
            chosenStyle
          ];
      }
    }
  }
}
