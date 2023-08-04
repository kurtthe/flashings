import { StackPrivateDefinitions } from './types';

import { FlashingStack } from '@features/flashing';

export const routes = {
  [StackPrivateDefinitions.FLASHING]: {
    name: StackPrivateDefinitions.FLASHING,
    component: FlashingStack,
  },
};
