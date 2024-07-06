import React from 'react';
import { OptionsType, ScrollBox } from '@ui/components';
import { StyleSheet } from 'react-native';
import {
  useCreateMaterial,
  useGetStores,
  useGetSupplier,
  useSendToStore,
} from '@hooks/jobs';
import { buildDataMaterialOrder } from '@features/jobs/utils';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  JobsStackParamsList,
  JobStackProps,
} from '@features/jobs/navigation/Stack.types';
import { Routes as RoutesJob } from '@features/jobs/navigation/routes';
import {
  ORDER_TYPE_STORE,
  RESPONSE_CREATE_AND_FLASHING,
  RESPONSE_MATERIAL_ORDER,
  STORE,
} from '@models';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { formatDate } from '@shared/utils/formatDate';
import { dataUserSelector } from '@store/auth/selectors';
import { actions as jobActions } from '@store/jobs/actions';
import { baseUrlPDF } from '@shared/endPoints';
import Loading from '@components/Loading';
import PDFShared from '@features/jobs/containers/PDFShared';
import OrderForm from '@features/jobs/containers/OrderForm';

const OrderSummaryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(dataUserSelector);

  const navigation = useNavigation<JobStackProps>();
  const route =
    useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>();

  const [urlIdPdf, setUrlIdPdf] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [idOfOrder, setIdOfOrder] = React.useState<number | undefined>();
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const [storeSelected, setStoreSelected] = React.useState<STORE | undefined>();

  const { data: stores, refetch } = useGetStores();
  const { data: dataSupplier, isLoading: loadingSupplier } = useGetSupplier();

  const { mutate: doMaterialOrder } = useCreateMaterial({
    onSuccess: data => {
      const orderNumber = (data as RESPONSE_MATERIAL_ORDER).order.order_number;
      const orderId = (data as RESPONSE_MATERIAL_ORDER).order.id;

      setOrderNumber(orderNumber);
      setIdOfOrder(orderId);
    },
  });

  const { mutate: sharedMaterialOrder, isLoading: loadingSharedMaterial } =
    useSendToStore({
      onSuccess: () => {
        if (!storeSelected) return;
        const jobId = route.params.jobId;

        const dataOrder: ORDER_TYPE_STORE = {
          orderNumber: `${orderNumber}`.trim(),
          urlPdf: urlIdPdf ?? '',
          store: storeSelected.name,
          date: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        };

        dispatch(jobActions.orderSent({ idJob: jobId, dataOrder }));
        navigation.navigate(RoutesJob.ORDER_SUBMITTED, { jobId });
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

  React.useEffect(() => {
    if (!urlIdPdf) return;
    const delayCreateMaterialOrder = setTimeout(
      () => handleCreateMaterialOrder(),
      2000,
    );
    return () => {
      clearTimeout(delayCreateMaterialOrder);
    };
  }, [urlIdPdf]);

  const handleChange = (itemStore: OptionsType) => {
    const dataStore = stores?.find(
      sItemStore => itemStore.value === sItemStore.id,
    );
    if (!dataStore) return;
    setStoreSelected(dataStore);
  };
  const handleCreateMaterialOrder = () => {
    if (!dataSupplier || !urlIdPdf) return;

    const jobName = route.params.jobName;
    const jobNumber = route.params.jobId;
    const jobAddress = route.params.jobAddress;

    const currentDate = formatDate(new Date());
    const dataMaterial = buildDataMaterialOrder({
      name: jobName,
      supplier: dataSupplier.id,
      issued_on: currentDate,
      description: `Job Name: ${jobName} - Job Number: ${jobNumber} - Job Address: ${jobAddress}`,
      attachments: [
        {
          name: `${jobName}.pdf`,
          link: urlIdPdf,
        },
      ],
    });
    doMaterialOrder({ material: dataMaterial });
  };

  const handleSendToStore = () => {
    if (!storeSelected || !dataUser || !idOfOrder) return;
    sharedMaterialOrder({
      dataShared: {
        emails: [
          storeSelected.email,
          `${dataUser.email}`,
          'burdens.orders@tradetrak.com.au',
          'matt.celima@burdens.com.au',
          'owenm@trak.co',
          'markm@trak.co',
          'mat@digitalbasis.com.au',
          'jeff@digitalbasis.com',
        ],
        message:
          'Thanks for your Flashings order - it has been received by our team for review and processing. An email notification will be sent to the account owner when it has been processed by the store. Please contact us at 03 9703 8400. Thank you, the Burdens Flashing App Team.',
        idOrder: idOfOrder,
      },
    });
  };

  if (!urlIdPdf || isLoading || loadingSupplier) {
    return <Loading title="Creating your Flashing Drawing" />;
  }

  return (
    <ScrollBox p="m" flex={1}>
      <>
        <PDFShared urlIdPdf={urlIdPdf} namePdf={route.params.jobName} />
        <OrderForm />
      </>
    </ScrollBox>
  );
};

export default OrderSummaryScreen;
