import { Routes as RoutesFlashing } from "@features/flashing/navigation/routes";
import { Routes as RoutesJobs } from "@features/jobs/navigation/routes";
import { StackNavigationProp } from "@react-navigation/stack";

export enum StackPrivateDefinitions {
  FLASHING = 'FLASHING',
  JOBS = 'JOBS',
}

export type StackPrivateParamsList = {
  [StackPrivateDefinitions.FLASHING]: {
    screen?: RoutesFlashing;
    params?: any
  };
  [StackPrivateDefinitions.JOBS]: {
    screen?: RoutesJobs;
    params?: any
  };
};

export type StackPrivateProps = StackNavigationProp<StackPrivateParamsList>;
