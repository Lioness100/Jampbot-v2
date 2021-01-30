import { stripIndents } from 'common-tags';
import fetch from 'node-fetch';

interface Word {
  word: string;
  result: ModifiedResult;
}

interface ModifiedResult {
  category: string;
  partOfSpeech: string;
  definition: string;
}

interface Result {
  inCategory: string[];
  partOfSpeech: string;
  definition: string;
}

interface Response {
  word: string;
  results: Result[];
}

export default class Hangman {
  public guessedLetters: string[] = [];
  public failedGuesses = 0;
  public status: 'IN_PROGRESS' | 'LOST' | 'WON' = 'IN_PROGRESS';
  public hiddenWord: string;

  public constructor(public word: string) {
    this.hiddenWord = '_'.repeat(word.length);
  }

  public guess(letter: string): void {
    if (this.status !== 'IN_PROGRESS') return;

    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters.push(letter);

      const indexes = [...this.word].reduce(
        (acc: number[], curr, idx) => (curr === letter ? [...acc, idx] : acc),
        []
      );

      if (indexes.length)
        this.hiddenWord = indexes
          .reduce((arr, idx) => ((arr[idx] = [...this.word][idx]), arr), [
            ...this.hiddenWord,
          ])
          .join('');
      else this.failedGuesses++;
    }
    if (6 === this.failedGuesses) this.status = 'LOST';
    if (!this.hiddenWord.includes('_')) this.status = 'WON';
  }

  public static async generateWord(): Promise<Word> {
    const { results, word } = (await (
      await fetch(
        'https://wordsapiv1.p.rapidapi.com/words/?frequencyMax=2.5&lettersMin=5&hasDetails=inCategory,partOfSpeech,definition&limit=1&random=true',
        {
          headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY!,
          },
        }
      )
    ).json()) as Response;

    const first = results.find(
      ({ partOfSpeech, inCategory, definition }) =>
        partOfSpeech && inCategory && definition
    )!;

    const result: ModifiedResult = {
      ...first,
      category: first.inCategory[0],
    };

    return {
      word,
      result,
    };
  }

  public ascii(): string {
    return stripIndents`${
      [
        `
    /---|
    |   
    |
    |
    |
    `,
        `
    /---|
    |   o
    |
    |
    |
    `,
        `
    /---|
    |   o
    |   |
    | 
    |
    `,
        `
    /---|
    |   o
    |  /|
    |
    |
    `,
        `
    /---|
    |   o
    |  /|\\
    |
    |
    `,
        `
    /---|
    |   o
    |  /|\\
    |  /
    |
    `,
        `
    /---|
    |   o ~ rude
    |  /|\\
    |  / \\
    |
    `,
      ][this.failedGuesses]
    }`;
  }
}
