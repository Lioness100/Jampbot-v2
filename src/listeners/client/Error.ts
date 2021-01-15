import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('error', {
  emitter: 'client',
  event: 'error',
})
export default class Error extends Listener {
  public exec(info: string): void {
    this.client.logger.error(info);
  }
}
