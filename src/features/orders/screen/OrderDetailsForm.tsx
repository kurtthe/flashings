import React from 'react';
import { Box, ScrollBox } from '@ui/components';
import OrderForm from '@features/orders/containers/OrderForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OrderDetailsFormScreen: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 20000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  return (
    <ScrollBox
      as={KeyboardAwareScrollView}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <Box p="m" flex={1}>
        <OrderForm />
      </Box>
    </ScrollBox>
  );
};

export default OrderDetailsFormScreen;
