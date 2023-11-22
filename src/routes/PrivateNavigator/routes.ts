import { StackPrivateDefinitions } from './types';

import { FlashingStack } from '@features/flashing';
import { JobStack } from '@features/jobs';
import { ProfileStack } from "@features/profile";

export const routes = {
  [StackPrivateDefinitions.FLASHING]: {
    name: StackPrivateDefinitions.FLASHING,
    component: FlashingStack,
  },
  [StackPrivateDefinitions.JOBS]: {
    name: StackPrivateDefinitions.JOBS,
    component: JobStack,
  },
  [StackPrivateDefinitions.PROFILE]: {
    name: StackPrivateDefinitions.PROFILE,
    component: ProfileStack,
  },
};
