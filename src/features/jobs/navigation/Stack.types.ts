import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import { JOB_DETAIL } from '@models';

export type JobsStackParamsList = {
  [Routes.CREATE_JOB]: undefined;
  [Routes.ALL_JOBS]: undefined;
  [Routes.JOB_DETAILS]: {
    item: JOB_DETAIL;
  };
};

export type JobStackProps = StackNavigationProp<JobsStackParamsList>;
