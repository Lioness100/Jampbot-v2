import { Listener, ListenerOptions } from 'discord-akairo';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('unhandledRejection', {
  emitter: 'process',
  event: 'unhandledRejection',
})
export default class UnhandledRejection extends Listener {
  public exec(reason: Error, promise: Promise<unknown>): void {
    this.client.logger.fatal(
      'Encountered an unhandled rejection at: ',
      promise,
      'reason: ',
      reason
    );
  }
}
