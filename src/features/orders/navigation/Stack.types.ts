import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesOrders } from './routes';
import { STORE } from '@models';

export type OrdersStackParamsList = {
  [RoutesOrders.ORDER_SUBMITTED]: undefined;
  [RoutesOrders.ORDER_SUMMARY]: {
    dataStore: STORE;
    responseApi: string;
  };
  [RoutesOrders.ORDER_DETAILS_FORM]: undefined;
};

export type OrdersStackProps = StackNavigationProp<OrdersStackParamsList>;
