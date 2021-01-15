import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('ready', {
  emitter: 'client',
  event: 'ready',
})
export default class Ready extends Listener {
  public exec(): void {
    this.client.logger.info(
      `Bot logged in as ${this.client.user?.tag ?? 'Unknown#0000'}`
    );
  }
}
