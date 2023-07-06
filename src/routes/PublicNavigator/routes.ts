import {StackPublicDefinitions} from './types';

import {FlashingStack} from '@features/flashing';

export const routes = {
  [StackPublicDefinitions.FLASHINGS]: {
    name: StackPublicDefinitions.FLASHINGS,
    component: FlashingStack,
  },
};
