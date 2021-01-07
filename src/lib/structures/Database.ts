import mongoose from 'mongoose';
import { logger } from '../utils/Logger';
import Entities from '../../entities';

export default class Database {
  public levels = Entities.Levels;

  public constructor() {
    mongoose.connection.on('error', (err) =>
      logger.error('The database encountered an error: ', err)
    );
  }

  public async init(): Promise<void> {
    try {
      void mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      logger.fatal("The database couldn't connect: ", err);
    }
    return new Promise((r) => mongoose.connection.on('open', r));
  }
}
