import type { CommandOptions } from 'discord-akairo';
import type { GuildMember, Message, EmbedFieldData } from 'discord.js';
import { commaListsAnd } from 'common-tags';
import ApplyOptions from '../../lib/utils/ApplyOptions';
import { Command, Hangman } from '../../lib/structures';
import { emotes } from '../../lib/utils/Constants';

interface Args {
  member?: GuildMember;
}

@ApplyOptions<CommandOptions>('hangman', {
  aliases: ['hangman', 'hangmab', 'hm'],
  description: 'Play hangman with the computer or another player',
  usage: '[member]',
  examples: ['Lioness100'],
  cooldown: 3e4,
  blockedChannels: 'default',
  args: [
    {
      id: 'member',
      type: 'member',
    },
  ],
})
export default class LeaderboardCommand extends Command {
  public async run(message: Message, { member }: Args): Promise<unknown> {
    if (member) return message.embed('Coming Soon!');
    const { result, word } = await Hangman.generateWord();

    const game = new Hangman(word);

    let sent = await message.util!.send(
      message
        .embed(`Welcome to a new game of hangman!`)
        .setDescription('Please response with a letter a-z')
        .addFields([
          { name: 'Word', value: `\`${game.hiddenWord.split('').join(' ')}\`` },
          { name: 'Part of Speech', value: result.partOfSpeech },
          { name: 'Incorrect Guesses', value: '6' },
          { name: 'Hangman', value: `\`\`\`${game.ascii()}\`\`\`` },
        ])
        .setFooter('Response `cancel` at any time')
    );

    const stop = ['cancel', 'stop', 'end'];

    const collector = message.channel.createMessageCollector(
      (collected: Message) =>
        collected.author.id === message.author.id &&
        new RegExp(`^([a-z]|${stop.join('|')})$`, 'i').test(collected.content),
      { time: 3e5 }
    );

    collector.on(
      'collect',
      (collected: Message) =>
        void (async () => {
          const content = collected.content.toLowerCase();

          if (stop.includes(content)) return collector.stop('cancel');

          if (game.guessedLetters.includes(content))
            return message.error(
              `You already guessed \`${content}\``,
              undefined,
              false
            );

          collector.resetTimer();

          game.guess(content);

          if (sent && sent.deletable && !sent.deleted) void sent.delete();

          if (game.status !== 'IN_PROGRESS')
            return collector.stop(game.status.toLowerCase());

          sent = await message.channel.send(
            message
              .embed('Please Respond With a Letter A-Z')
              .addFields(
                [
                  {
                    name: 'Word So Far',
                    value: `\`${game.hiddenWord.split('').join(' ')}\``,
                  },
                  game.failedGuesses > 2 && {
                    name: '[HINT] Category',
                    value: result.category,
                  },
                  { name: 'Part of Speech', value: result.partOfSpeech },
                  {
                    name: 'Guessed Letters',
                    value: commaListsAnd`\`${game.guessedLetters}\``,
                  },
                  {
                    name: 'Incorrect Guesses Left',
                    value: 6 - game.failedGuesses,
                  },
                  { name: 'Hangman', value: `\`\`\`${game.ascii()}\`\`\`` },
                ].filter(Boolean) as EmbedFieldData[]
              )
              .setFooter('Response `cancel` at any time')
          );
        })().catch(this.client.logger.warn.bind(this))
    );

    collector.on('end', (collected, reason) => {
      switch (reason) {
        case 'won':
          return message.embed(
            `Congratulations, You Win! ${emotes.hooray}`,
            (embed) =>
              embed.addFields([
                { name: 'Finished Word', value: `\`${word}\`` },
                { name: 'Definition', value: result.definition },
                {
                  name: 'Guessed Letters',
                  value: commaListsAnd`\`${game.guessedLetters}\``,
                },
                {
                  name: 'Incorrect Guesses',
                  value: `\`${game.failedGuesses}\``,
                },
                {
                  name: 'Hangman',
                  value: `\`\`\`${game.ascii()}\`\`\``,
                },
              ]),
            false
          );

        case 'lost':
          return message.embed(
            `You Lost`,
            (embed) =>
              embed.setColor('RED').addFields([
                { name: 'Actual Word', value: `\`${word}\`` },
                { name: 'Definition', value: result.definition },
                {
                  name: 'Guessed Letters',
                  value: commaListsAnd`\`${game.guessedLetters}\``,
                },
                { name: 'Hangman', value: `\`\`\`${game.ascii()}\`\`\`` },
              ]),
            false
          );

        case 'time':
          return message.error(
            `You took longer than 5 minutes! Game canceled`,
            undefined,
            false
          );
      }
    });
  }
}
