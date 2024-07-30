import React from 'react';
import { Box, Button, ScrollBox } from '@ui/components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Loading from '@components/Loading';
import PDFShared from '@features/jobs/containers/PDFShared';
import {
  ORDER_TYPE_STORE,
  RESPONSE_CREATE_AND_FLASHING,
  RESPONSE_MATERIAL_ORDER,
} from '@models';
import { baseUrlPDF } from '@shared/endPoints';
import { RoutesOrders } from '@features/orders/navigation/routes';
import {
  OrdersStackParamsList,
  OrdersStackProps,
} from '@features/orders/navigation/Stack.types';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import {
  getDataMaterialOrderForSendToStore,
  getJobIdOrder,
  getJobNameOrder,
  getStoreSelectedOrder,
} from '@store/orders/selectors';
import { useCreateMaterial, useSendToStore } from '@hooks/jobs';
import { dataUserSelector } from '@store/auth/selectors';
import { config } from '@env/config';
import { formatDate } from '@shared/utils/formatDate';
import { actions as jobActions } from '@store/jobs/actions';

const OrderSummaryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<OrdersStackProps>();
  const route =
    useRoute<RouteProp<OrdersStackParamsList, RoutesOrders.ORDER_SUMMARY>>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [urlIdPdf, setUrlIdPdf] = React.useState<string>();
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const jobNameOrder = useAppSelector(getJobNameOrder);
  const dataUser = useAppSelector(dataUserSelector);
  const jobIdOrder = useAppSelector(getJobIdOrder);
  const storeSelected = useAppSelector(getStoreSelectedOrder);
  const dataMaterial = useAppSelector(getDataMaterialOrderForSendToStore);

  const { mutate: doMaterialOrder, isLoading: loadingMaterialOrder } =
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
              message: '',
              idOrder: orderId,
            },
          });
        }, 500);
      },
    });

  const { mutate: sharedMaterialOrder, isLoading: isLoadingHandleShare } =
    useSendToStore({
      onSuccess: () => {
        if (!storeSelected || !jobIdOrder) return;

        const dataOrder: ORDER_TYPE_STORE = {
          orderNumber: `${orderNumber}`.trim(),
          urlPdf: urlIdPdf ?? '',
          store: storeSelected.name,
          date: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        };

        dispatch(jobActions.orderSent({ idJob: jobIdOrder, dataOrder }));
        navigation.navigate(RoutesOrders.ORDER_SUBMITTED);
      },
    });

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

  if (!urlIdPdf || isLoading || !jobNameOrder) {
    return <Loading title="Creating your Flashing Drawing" />;
  }

  const handleSendToStore = () => {
    if (!dataMaterial) return;
    doMaterialOrder({ material: dataMaterial });
  };

  return (
    <ScrollBox enableOnAndroid>
      <Box p="m" flex={1}>
        <PDFShared urlIdPdf={urlIdPdf} namePdf={jobNameOrder} height={500} />
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
