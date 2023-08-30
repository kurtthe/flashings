import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import {FLASHINGS_DATA} from "@models";

export type FLASHINGParamsList = {
  [Routes.CREATE_FLASHING]: {
    jobId: number,
  };
  [Routes.GUTTER_FLASHING]: {
    data: FLASHINGS_DATA,
    jobId: number,
  };
  [Routes.DEMO]: undefined;
};

export type FlashingStackProps = StackNavigationProp<FLASHINGParamsList>;
