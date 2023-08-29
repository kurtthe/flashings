import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import { JOB_DATA } from "@models";

export type JobsStackParamsList = {
  [Routes.CREATE_JOB]: undefined;
  [Routes.ALL_JOBS]: undefined;
  [Routes.JOB_DETAILS]: {
    item: JOB_DATA;
  };
};

export type JobStackProps = StackNavigationProp<JobsStackParamsList>;
