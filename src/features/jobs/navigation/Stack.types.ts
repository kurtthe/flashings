import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';

export type JobsStackParamsList = {
  [Routes.CREATE_JOB]: undefined;
  [Routes.ALL_JOBS]: undefined;
  [Routes.JOB_DETAILS]: {
    jobId: number;
  };
};

export type JobStackProps = StackNavigationProp<JobsStackParamsList>;
