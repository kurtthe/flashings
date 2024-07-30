import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton, HeaderBox } from '@ui/components';
import { RoutesOrders } from '@features/orders/navigation/routes';
import {
  OrderDetailsFormScreen,
  OrderSubmittedScreen,
  OrderSummaryScreen,
} from '@features/orders/screen';
import { OrdersStackParamsList } from '@features/orders/navigation/Stack.types';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<OrdersStackParamsList>();

  return (
    <Navigator initialRouteName={RoutesOrders.ORDER_DETAILS_FORM}>
      <Screen
        key={RoutesOrders.ORDER_SUBMITTED}
        name={RoutesOrders.ORDER_SUBMITTED}
        component={OrderSubmittedScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        key={RoutesOrders.ORDER_SUMMARY}
        name={RoutesOrders.ORDER_SUMMARY}
        component={OrderSummaryScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton />}
              title="Order Summary"
            />
          ),
        }}
      />
      <Screen
        key={RoutesOrders.ORDER_DETAILS_FORM}
        name={RoutesOrders.ORDER_DETAILS_FORM}
        component={OrderDetailsFormScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton />}
              title="Order Summary"
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
