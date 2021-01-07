import { inspect } from 'util';
import fs from 'fs';
import { DateMeasure, logLevels } from './Constants';

export class Logger {
  private streams: fs.WriteStream[];

  public constructor() {
    this.streams = Object.keys(logLevels).map((level) =>
      fs.createWriteStream(`./logs/${level}.log`, { flags: 'a' })
    );
    this.streams.forEach((stream) =>
      stream.write('\n\n-----------------------------------------------\n\n')
    );
  }

  private write(content: unknown[], level: keyof typeof logLevels) {
    console.log(this.format(content, level, true));
    this.streams
      .find((stream) => stream.path.includes(level))
      .write(this.format(content, level));
  }

  public fatal(...content: any[]): void {
    this.write(content, 'fatal');
    process.exit(1);
  }

  public error(...content: any[]): void {
    this.write(content, 'error');
  }

  public warn(...content: any[]): void {
    this.write(content, 'warn');
  }

  public info(...content: any[]): void {
    return this.write(content, 'info');
  }

  public debug(...content: any[]): void {
    this.write(content, 'debug');
  }

  private date() {
    const date = new Date();
    const calculate = (measure: DateMeasure, inc = 0) =>
      ((date[`get${measure}`] as () => number)() + inc)
        .toString()
        .padStart(2, '0');
    return `${calculate('Month', 1)}/${calculate('Date')}/${calculate(
      'FullYear'
    )} ${calculate('Hours')}:${calculate('Minutes')}:${calculate('Seconds')}`;
  }

  private format(
    content: unknown[],
    level: keyof typeof logLevels,
    console = false
  ) {
    return `[${this.date()}] ${
      console
        ? `${logLevels[level]}[${level.toUpperCase()}]\x1b[0m`
        : `[${level.toUpperCase()}]`
    } ${content
      .map((val) => (typeof val === 'string' ? val : inspect(val)))
      .join('')}${console ? '' : '\n'}`;
  }
}

export const logger = new Logger();
