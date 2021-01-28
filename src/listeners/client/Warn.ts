import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('warn', {
  emitter: 'client',
  event: 'warn',
})
export default class WarnListener extends Listener {
  public exec(info: string): void {
    this.client.logger.warn(info);
  }
}
