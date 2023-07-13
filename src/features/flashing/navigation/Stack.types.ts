import {StackNavigationProp} from '@react-navigation/stack';
import {Routes} from './routes';

export type FLASHINGParamsList = {
  [Routes.CREATE_FLASHING]: undefined;
  [Routes.GUTTER_FLASHING]: undefined;
};

export type FLASHINGStackProps = StackNavigationProp<FLASHINGParamsList>;
