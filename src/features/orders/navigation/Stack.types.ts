import { StackNavigationProp } from '@react-navigation/stack';
import { RoutesOrders } from './routes';

export type OrdersStackParamsList = {
  [RoutesOrders.ORDER_SUBMITTED]: {
    jobId: number;
  };
  [RoutesOrders.ORDER_SUMMARY]: {
    responseApi: string;
    jobName: string;
    jobId: number;
    jobAddress: string;
  };
  [RoutesOrders.ORDER_DETAILS_FORM]: {
    jobId: number;
    jobAddress: string;
    jobName: string;
  };
};

export type OrdersStackProps = StackNavigationProp<OrdersStackParamsList>;
