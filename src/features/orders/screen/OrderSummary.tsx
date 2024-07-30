import React from 'react';
import { Box, ScrollBox } from '@ui/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import Loading from '@components/Loading';
import PDFShared from '@features/jobs/containers/PDFShared';
import OrderForm from '@features/jobs/containers/OrderForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RESPONSE_CREATE_AND_FLASHING } from '@models';
import { baseUrlPDF } from '@shared/endPoints';
import { RoutesOrders } from '@features/orders/navigation/routes';
import { OrdersStackParamsList } from '@features/orders/navigation/Stack.types';

const OrderSummaryScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<OrdersStackParamsList, RoutesOrders.ORDER_SUMMARY>>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [urlIdPdf, setUrlIdPdf] = React.useState<string>();

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 20000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  React.useEffect(() => {
    if (isLoading) return;
    const parseJSON: RESPONSE_CREATE_AND_FLASHING = JSON.parse(
      route.params.responseApi,
    );
    const fileName = parseJSON.response.file_name;
    setUrlIdPdf(`${baseUrlPDF}${fileName}`);
  }, [route.params.responseApi, isLoading]);

  if (!urlIdPdf || isLoading) {
    return <Loading title="Creating your Flashing Drawing" />;
  }

  return (
    <ScrollBox
      as={KeyboardAwareScrollView}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      showsVerticalScrollIndicator={false}>
      <Box p="m" flex={1}>
        <PDFShared urlIdPdf={urlIdPdf} namePdf={route.params.jobName} />
        <OrderForm
          urlIdPdf={urlIdPdf}
          jobId={route.params.jobId}
          jobName={route.params.jobName}
          jobAddress={route.params.jobAddress}
        />
      </Box>
    </ScrollBox>
  );
};

export default OrderSummaryScreen;
