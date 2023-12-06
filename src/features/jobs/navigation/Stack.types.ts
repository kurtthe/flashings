import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';

export type JobsStackParamsList = {
  [Routes.CREATE_EDIT_JOB]: {
    jobId?: number
  };
  [Routes.ALL_JOBS]: undefined;
  [Routes.ORDER_SUBMITTED]: undefined;
  [Routes.ORDER_SUMMARY]: undefined;
  [Routes.JOB_DETAILS]: {
    jobId: number;
    jobName?: string;
  };
};

export type JobStackProps = StackNavigationProp<JobsStackParamsList>;

