import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';
import type { Constructor } from './Constants';

const createClassDecorator = <T extends (...args: any[]) => void>(
  fn: T
): ClassDecorator => fn;

export default function ApplyOptions<T extends AkairoModuleOptions>(
  id: string,
  options?: T
): ClassDecorator {
  return createClassDecorator(
    (target: Constructor<AkairoModule>) =>
      class extends target {
        public constructor() {
          super(id, options);
        }
      }
  );
}
