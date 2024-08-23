import React from 'react';
import {Box, Button, ScrollBox} from '@ui/components';
import {useNavigation} from '@react-navigation/native';
import Loading from '@components/Loading';
import PDFShared from '@features/jobs/containers/PDFShared';
import {ORDER_TYPE_STORE, RESPONSE_MATERIAL_ORDER} from '@models';
import {RoutesOrders} from '@features/orders/navigation/routes';
import {OrdersStackProps} from '@features/orders/navigation/Stack.types';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {
  getDataMaterialOrderForSendToStore,
  getJobIdOrder,
  getJobNameOrder,
  getMessageEmailSendToOrder,
  getStoreSelectedOrder,
  getUrlPDF,
} from '@store/orders/selectors';
import {useCreateMaterial, useSendToStore} from '@hooks/jobs';
import {dataUserSelector} from '@store/auth/selectors';
import {config} from '@env/config';
import {formatDate} from '@shared/utils/formatDate';
import {actions as jobActions} from '@store/jobs/actions';

const OrderSummaryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<OrdersStackProps>();

  const [isLoading, setIsLoading] = React.useState(true);
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const jobNameOrder = useAppSelector(getJobNameOrder);
  const dataUser = useAppSelector(dataUserSelector);
  const jobIdOrder = useAppSelector(getJobIdOrder);
  const storeSelected = useAppSelector(getStoreSelectedOrder);
  const dataMaterial = useAppSelector(getDataMaterialOrderForSendToStore);
  const urlIdPdf = useAppSelector(getUrlPDF);
  const messageEmail = useAppSelector(getMessageEmailSendToOrder);

  const {mutate: doMaterialOrder, isLoading: loadingMaterialOrder} =
    useCreateMaterial({
      onSuccess: data => {
        const orderNumber = (data as RESPONSE_MATERIAL_ORDER).order
          .order_number;
        const orderId = (data as RESPONSE_MATERIAL_ORDER).order.id;
        setOrderNumber(orderNumber);

        if (!storeSelected) return;

        setTimeout(() => {
          sharedMaterialOrder({
            dataShared: {
              emails: [
                storeSelected.email,
                `${dataUser.email}`,
                ...config.emailsToShared,
              ],
              message: messageEmail ?? config.messageToShared,
              idOrder: orderId,
            },
          });
        }, 500);
      },
    });

  const {mutate: sharedMaterialOrder, isLoading: isLoadingHandleShare} =
    useSendToStore({
      onSuccess: () => {
        if (!storeSelected || !jobIdOrder || !urlIdPdf) return;

        const dataOrder: ORDER_TYPE_STORE = {
          orderNumber: `${orderNumber}`.trim(),
          urlPdf: urlIdPdf,
          store: storeSelected.name,
          date: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        };

        dispatch(jobActions.orderSent({idJob: jobIdOrder, dataOrder}));
        navigation.navigate(RoutesOrders.ORDER_SUBMITTED);
      },
    });

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 20000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const handleSendToStore = React.useCallback(() => {
    if (!dataMaterial) return;
    doMaterialOrder({material: dataMaterial});
  }, [dataMaterial]);

  if (!urlIdPdf || isLoading || !jobNameOrder) {
    return <Loading title="Creating your Flashing Drawing" />;
  }

  return (
    <ScrollBox enableOnAndroid>
      <Box p="m" flex={1}>
        <PDFShared urlIdPdf={urlIdPdf} namePdf={jobNameOrder} height={'80%'} />
        <Button
          my="s"
          variant="solid"
          borderRadius="unset"
          isLoading={isLoadingHandleShare || isLoading || loadingMaterialOrder}
          onPress={handleSendToStore}>
          Send to store
        </Button>
      </Box>
    </ScrollBox>
  );
};

export default OrderSummaryScreen;
