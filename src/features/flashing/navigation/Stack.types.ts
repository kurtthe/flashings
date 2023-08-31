import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import {FLASHINGS_DATA} from "@models";

export type FlashingParamsList = {
  [Routes.CREATE_EDIT_FLASHING]: {
    jobId: number,
    jobName: string,
  };
  [Routes.BOARD_FLASHING]: {
    data: FLASHINGS_DATA,
    jobId: number,
    jobName: string
  };
  [Routes.DEMO]: undefined;
};

export type FlashingStackProps = StackNavigationProp<FlashingParamsList>;
