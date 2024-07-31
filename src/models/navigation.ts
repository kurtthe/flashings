import { StackNavigationProp } from '@react-navigation/stack';
import { StackPrivateParamsList } from '@routes/PrivateNavigator';

export enum StackPrivateDefinitions {
  FLASHING = 'FLASHING',
  JOBS = 'JOBS',
  PROFILE = 'PROFILE',
  ORDERS = 'ORDERS',
}

export type StackPrivateProps = StackNavigationProp<StackPrivateParamsList>;
