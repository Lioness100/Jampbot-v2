import { Inhibitor, InhibitorOptions } from 'discord-akairo';
import { Message } from 'discord.js';
import ApplyOptions from '../lib/utils/ApplyOptions';
import { blacklist } from '../lib/utils/Constants';

@ApplyOptions<InhibitorOptions>('blacklist', {
  reason: 'blacklist',
  type: 'pre',
})
export default class Blacklist extends Inhibitor {
  public exec(message: Message): boolean {
    return blacklist.includes(message.author.id);
  }
}
