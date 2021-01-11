import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('exit', {
  emitter: 'process',
  event: 'exit',
})
export default class Exit extends Listener {
  public exec(): void {
    console.log('Exiting...');
    this.client.destroy();
  }
}
