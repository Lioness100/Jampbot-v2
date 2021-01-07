import { getModelForClass } from '@typegoose/typegoose';

import Levels from './Levels';

export default {
  Levels: getModelForClass(Levels),
};
