import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('uncaughtException', {
  emitter: 'process',
  event: 'uncaughtException',
})
export default class UncaughtExceptionListener extends Listener {
  public exec(error: Error): void {
    this.client.logger.fatal('Encountered an uncaught exception: ', error);
  }
}
