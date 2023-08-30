import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from './routes';
import {FLASHINGS_DATA} from "@models";

export type FLASHINGParamsList = {
  [Routes.CREATE_FLASHING]: undefined;
  [Routes.GUTTER_FLASHING]: {
    data: FLASHINGS_DATA
  };
  [Routes.DEMO]: undefined;
};

export type FlashingStackProps = StackNavigationProp<FLASHINGParamsList>;
