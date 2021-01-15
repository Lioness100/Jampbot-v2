import { AkairoModule, AkairoModuleOptions } from 'discord-akairo';

const createClassDecorator = <T extends (...args: any[]) => void>(
  fn: T
): ClassDecorator => fn;

export default function ApplyOptions<T extends AkairoModuleOptions>(
  id: string,
  options?: T
): ClassDecorator {
  return createClassDecorator(
    (target: new (...args: any[]) => AkairoModule) =>
      class extends target {
        public constructor() {
          super(id, options);
        }
      }
  );
}
