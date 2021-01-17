import type { Headers } from 'node-fetch';

export const clocks = [
  '🕛',
  '🕐',
  '🕑',
  '🕒',
  '🕓',
  '🕔',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚',
];

export const logLevels = {
  fatal: '\x1b[31m\x1b[30m\x1b[1m',
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[34m',
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

export const generalChannels = [
  '699220239698886679',
  '699221859580903435',
  '699222200787402762',
  '699704365799440526',
  '699672275854819408',
  '699633909595635783',
  '699221277008855071',
];

export const spamChannels = [
  '699220239698886679',
  '699222200787402762',
  '699221277008855071',
  '699612856018272289',
  '699704365799440526',
  '722174152357707776',
  '699230720392167482',
];

export const measures = {
  yearly: '0 0 1 1 *',
  annually: '0 0 1 1 *',
  monthly: '0 0 1 * *',
  weekly: '0 0 * * 1',
  daily: '0 0 * * *',
  hourly: '0 * * * *',
};

export const categories: Record<string, string> = {
  info: '👀',
  misc: '🤡',
  utility: '🤖',
  moderation: '🛠',
};

export interface Leaderboard {
  xp: number;
  level: number;
  position: number;
  tag: string;
}

export interface Response {
  status: number;
  headers?: Headers;
  body?: Buffer | Record<string, unknown>;
  text?: string;
}

export const blacklist: string[] = [];
