import { prop, pre } from '@typegoose/typegoose';
import { logger } from '../lib/utils/Logger';

@pre<Entity>('save', function () {
  this.lastUpdated = new Date();
})
export default abstract class Entity {
  @prop()
  public id: string;

  @prop({ default: new Date() })
  public lastUpdated: Date;

  protected logger = logger;
}
