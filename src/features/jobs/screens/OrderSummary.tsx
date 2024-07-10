import React from 'react';
import { Box, ScrollBox } from '@ui/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { JobsStackParamsList } from '@features/jobs/navigation/Stack.types';
import { Routes as RoutesJob } from '@features/jobs/navigation/routes';
import Loading from '@components/Loading';
import PDFShared from '@features/jobs/containers/PDFShared';
import OrderForm from '@features/jobs/containers/OrderForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OrderSummaryScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>();

  const [urlIdPdf, setUrlIdPdf] = React.useState<string>();

  if (!urlIdPdf) {
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
          setUrlPdf={setUrlIdPdf}
          responseApi={route.params.responseApi}
          jobId={route.params.jobId}
          jobName={route.params.jobName}
          jobAddress={route.params.jobAddress}
        />
      </Box>
    </ScrollBox>
  );
};

export default OrderSummaryScreen;
