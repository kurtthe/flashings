import { StackPrivateDefinitions } from './types';

import { FlashingStack } from '@features/flashing';
import { JobStack } from '@features/jobs';

export const routes = {
  [StackPrivateDefinitions.FLASHING]: {
    name: StackPrivateDefinitions.FLASHING,
    component: FlashingStack,
  },
  [StackPrivateDefinitions.JOBS]: {
    name: StackPrivateDefinitions.JOBS,
    component: JobStack,
  },
};
