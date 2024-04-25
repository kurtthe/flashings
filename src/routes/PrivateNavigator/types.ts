import { Routes as RoutesFlashing } from '@features/flashing/navigation/routes';
import { Routes as RoutesJobs } from '@features/jobs/navigation/routes';
import { Routes as RoutesProfile } from '@features/profile/navigation/routes';
import { StackPrivateDefinitions } from '@models/navigation';

export type StackPrivateParamsList = {
  [StackPrivateDefinitions.FLASHING]: {
    screen?: RoutesFlashing;
    params?: any;
  };
  [StackPrivateDefinitions.JOBS]: {
    screen?: RoutesJobs;
    params?: any;
  };
  [StackPrivateDefinitions.PROFILE]: {
    screen?: RoutesProfile;
    params?: any;
  };
};
