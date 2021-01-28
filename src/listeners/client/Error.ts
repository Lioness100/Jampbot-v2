import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('error', {
  emitter: 'client',
  event: 'error',
})
export default class ErrorListener extends Listener {
  public exec(info: string): void {
    this.client.logger.error(info);
  }
}
