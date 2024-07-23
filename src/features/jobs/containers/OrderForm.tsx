import React from 'react';
import { Formik, FormikProps } from 'formik';
import { formKeys, forms } from '../constants';
import CreateOrderForm from '@features/jobs/components/CreateOrderForm';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { KeyboardAvoidingBox } from '@ui/components';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {
  useCreateMaterial,
  useGetStores,
  useGetSupplier,
  useSendToStore,
} from '@hooks/jobs';
import { ORDER_TYPE_STORE, RESPONSE_MATERIAL_ORDER, STORE } from '@models';
import { formatDate } from '@shared/utils/formatDate';
import { actions as jobActions } from '@store/jobs/actions';
import { Routes as RoutesJob } from '@features/jobs/navigation/routes';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { useNavigation } from '@react-navigation/native';
import { JobStackProps } from '@features/jobs/navigation/Stack.types';
import { buildDataMaterialOrder } from '@features/jobs/utils/orders';
import { dataUserSelector } from '@store/auth/selectors';
import { config } from '@env/config';
import dayjs from 'dayjs';

type Props = {
  jobName: string;
  jobAddress: string;
  jobId: number;
  urlIdPdf: string;
};

const OrderForm: React.FC<Props> = ({
  jobName,
  jobAddress,
  jobId,
  urlIdPdf,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<JobStackProps>();
  const dataUser = useAppSelector(dataUserSelector);

  const { data: stores } = useGetStores();
  const { data: dataSupplier } = useGetSupplier();

  const [storeSelected, setStoreSelected] = React.useState<STORE | undefined>();
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const [messageEmail, setMessageEmail] = React.useState<string>('');

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
              message: messageEmail,
              idOrder: orderId,
            },
          });
        }, 500);
      },
    });

  const { mutate: sharedMaterialOrder, isLoading: isLoadinghandleShare } =
    useSendToStore({
      onSuccess: () => {
        if (!storeSelected) return;

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

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!dataSupplier || !urlIdPdf || !values || !dataUser) return;

      const dataStoreSelected = stores?.find(
        itemStore =>
          values[formKeys.createOrder.store] === itemStore.id.toString(),
      );
      if (!dataStoreSelected) return;
      setStoreSelected(dataStoreSelected);
      // @ts-ignore
      const [day, month, year] = values[formKeys.createOrder.date].split('/');
      const formattedDateString = `${year}-${month}-${day}`;

      const isQuoteOnly = !!values[formKeys.createOrder.quote_only];

      const dataMaterial = buildDataMaterialOrder({
        name: jobName,
        supplier: dataSupplier.id,
        issued_on: formattedDateString,
        // @ts-ignore
        notes: values[formKeys.createOrder.comments],
        description: `${
          isQuoteOnly ? 'Quote Only' : ''
        } Job Name: ${jobName} - Job Number: ${jobId} - Job Address: ${jobAddress}`,
        attachments: [
          {
            name: `${jobName}.pdf`,
            link: urlIdPdf,
          },
        ],
        delivery_instructions: {
          // @ts-ignore
          delivery: values[formKeys.createOrder.deliveryOrPickUp],
          // @ts-ignore
          location: values[formKeys.createOrder.address],
          contact_name: `${dataUser.first_name} ${dataUser.last_name}`,
          // @ts-ignore
          contact_number: dataUser.phone_number,
          date: formattedDateString,
          // @ts-ignore
          time: values[formKeys.createOrder.time],
        },
        burdens_data: values[formKeys.createOrder.burdens_data],
      });

      setMessageEmail(`${config.messageToShared} 
              Store: ${dataStoreSelected.name}
              Date: ${formattedDateString}
              Delivery or pickup: ${
                values[formKeys.createOrder.deliveryOrPickUp]
              }
              ${
                values[formKeys.createOrder.deliveryOrPickUp] === 'delivery'
                  ? `Address: ${values[formKeys.createOrder.address]}`
                  : `Time: ${values[formKeys.createOrder.time]}`
              }`);

      doMaterialOrder({ material: dataMaterial });
    },
    [dataSupplier, urlIdPdf, dataUser, stores],
  );

  return (
    <KeyboardAvoidingBox flex={1}>
      <DismissKeyboardPressable>
        <Formik
          enableReinitialize
          initialErrors={forms.createOrder.initialErrors}
          initialValues={forms.createOrder.initialValues}
          validationSchema={forms.createOrder.schema}
          onSubmit={handleSubmit}>
          <CreateOrderForm
            isLoading={isLoadinghandleShare || loadingMaterialOrder}
          />
        </Formik>
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>
  );
};
export default OrderForm;
