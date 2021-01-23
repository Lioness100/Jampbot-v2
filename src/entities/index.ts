import { getModelForClass } from '@typegoose/typegoose';

import Levels from './Levels';
import Mutes from './Mutes';

export default {
  Levels: getModelForClass(Levels),
  Mutes: getModelForClass(Mutes),
};
