export const logLevels = {
  fatal: '\x1b[41m\x1b[30m\x1b[1m',
  error: '\x1b[41m',
  warn: '\x1b[43m',
  info: '\x1b[44m',
  debug: '\x1b[32m',
};

export type DateMeasure =
  | 'Date'
  | 'Day'
  | 'FullYear'
  | 'Hours'
  | 'Milliseconds'
  | 'Minutes'
  | 'Month'
  | 'Seconds'
  | 'Time'
  | 'TimezoneOffset'
  | 'UTCDate'
  | 'UTCDay'
  | 'UTCFullYear'
  | 'UTCHours'
  | 'UTCMilliseconds'
  | 'UTCMinutes'
  | 'UTCMonth'
  | 'UTCSeconds'
  | 'Year';

export interface Leaderboard {
  xp: number;
  level: number;
  position: number;
  tag: string;
}

export type ReadonlyArray = readonly unknown[];

export type Constructor<T> = new (...args: any[]) => T;

export const blacklist: string[] = [];
