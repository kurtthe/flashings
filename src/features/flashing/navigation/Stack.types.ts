import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import {FLASHINGS_DATA} from "@models";

export type FlashingParamsList = {
  [Routes.CREATE_EDIT_FLASHING]: {
    jobId: number,
    idFlashing?: number
  };
  [Routes.BOARD_FLASHING]: {
    data: FLASHINGS_DATA,
    jobId: number,
  };
  [Routes.DEMO]: undefined;
  [Routes.CREATE_RAINHEAD]: undefined;
};

export type FlashingStackProps = StackNavigationProp<FlashingParamsList>;
