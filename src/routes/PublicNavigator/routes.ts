import { StackPublicDefinitions } from './types';

import { AuthStack } from '@features/auth';

export const routes = {
  [StackPublicDefinitions.AUTH]: {
    name: StackPublicDefinitions.AUTH,
    component: AuthStack,
  },
};
