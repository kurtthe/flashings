import { FlashingStack } from '@features/flashing';
import { JobStack } from '@features/jobs';
import { OrdersStack } from '@features/orders';
import { ProfileStack } from '@features/profile';
import { StackPrivateDefinitions } from '@models/navigation';

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
  [StackPrivateDefinitions.ORDERS]: {
    name: StackPrivateDefinitions.ORDERS,
    component: OrdersStack,
  },
};
