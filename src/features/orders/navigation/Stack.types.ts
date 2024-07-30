import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesOrders } from './routes';

export type OrdersStackParamsList = {
  [RoutesOrders.ORDER_SUBMITTED]: undefined;
  [RoutesOrders.ORDER_SUMMARY]: {
    responseApi: string;
  };
  [RoutesOrders.ORDER_DETAILS_FORM]: undefined;
};

export type OrdersStackProps = StackNavigationProp<OrdersStackParamsList>;
