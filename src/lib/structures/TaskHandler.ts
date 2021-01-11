import { AkairoHandler, AkairoClient } from 'discord-akairo';
import { Task } from './Task';

export default class TaskHandler extends AkairoHandler {
  public constructor(client: AkairoClient, options = {}) {
    super(client, { ...options, classToHandle: Task });
  }
}
