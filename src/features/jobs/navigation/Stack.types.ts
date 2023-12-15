import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';

export type JobsStackParamsList = {
  [Routes.CREATE_EDIT_JOB]: {
    jobId?: number
  };
  [Routes.ALL_JOBS]: undefined;
  [Routes.ORDER_SUBMITTED]: {
    jobId: number
  };
  [Routes.ORDER_SUMMARY]: {
    responseApi: string;
    jobName: string;
    jobId: number;
    jobAddress: string;
  };
  [Routes.JOB_DETAILS]: {
    jobId: number;
    jobName?: string;
  };
};

export type JobStackProps = StackNavigationProp<JobsStackParamsList>;

