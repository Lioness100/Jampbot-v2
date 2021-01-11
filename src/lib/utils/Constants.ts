export const logLevels = {
  fatal: '\x1b[41m\x1b[30m\x1b[1m',
  error: '\x1b[41m',
  warn: '\x1b[43m',
  info: '\x1b[44m',
  debug: '\x1b[32m',
};

export const channels = {
  welcome: '710497845278670989',
  log: '699230720392167482',
  rules: '699220667484078131',
};

export const emotes = {
  pog: '<:PridePog:796585159607975947>',
  sad: '<:SadBowser:717925128331329607>',
};

export const roles = {
  member: '699232048644227115',
};

export const measures = {
  yearly: '0 0 1 1 *',
  annually: '0 0 1 1 *',
  monthly: '0 0 1 * *',
  weekly: '0 0 * * 1',
  daily: '0 0 * * *',
  hourly: '0 * * * *',
};

export interface Leaderboard {
  xp: number;
  level: number;
  position: number;
  tag: string;
}

export type ReadonlyArray = readonly unknown[];

export type Constructor<T> = new (...args: any[]) => T;

export const blacklist: string[] = [];
