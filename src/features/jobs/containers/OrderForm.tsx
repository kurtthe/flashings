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
  const formikRef = React.useRef<FormikProps<CreateOrderFormValues>>(null);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<JobStackProps>();
  const dataUser = useAppSelector(dataUserSelector);

  const { data: stores } = useGetStores();
  const { data: dataSupplier } = useGetSupplier();

  const [storeSelected, setStoreSelected] = React.useState<STORE | undefined>();
  const [idOfOrder, setIdOfOrder] = React.useState<number | undefined>();
  const [orderNumber, setOrderNumber] = React.useState<string | undefined>();
  const [, _setUrlIdPdf] = React.useState<string>();

  const { mutate: doMaterialOrder } = useCreateMaterial({
    onSuccess: data => {
      const orderNumber = (data as RESPONSE_MATERIAL_ORDER).order.order_number;
      const orderId = (data as RESPONSE_MATERIAL_ORDER).order.id;

      setOrderNumber(orderNumber);
      setIdOfOrder(orderId);
    },
  });

  const { mutate: sharedMaterialOrder } = useSendToStore({
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

  React.useEffect(() => {
    if (!urlIdPdf) return;
    console.log('===>_urlIdPdf', urlIdPdf);
    const delayCreateMaterialOrder = setTimeout(
      () => _handleCreateMaterialOrder(),
      2000,
    );
    return () => {
      clearTimeout(delayCreateMaterialOrder);
    };
  }, [urlIdPdf]);

  const _handleCreateMaterialOrder = React.useCallback(() => {
    if (!dataSupplier || !urlIdPdf || !formikRef.current || !dataUser) return;

    const values = formikRef.current.values;
    if (!values) return;

    const dataMaterial = buildDataMaterialOrder({
      name: jobName,
      supplier: dataSupplier.id,
      issued_on: values[formKeys.createOrder.date],
      notes: values[formKeys.createOrder.comments],
      description: `Job Name: ${jobName} - Job Number: ${jobId} - Job Address: ${jobAddress}`,
      attachments: [
        {
          name: `${jobName}.pdf`,
          link: urlIdPdf,
        },
      ],
      delivery_instructions: {
        delivery: values[formKeys.createOrder.deliveryOrPickUp],
        location: values[formKeys.createOrder.address],
        contact_name: `${dataUser.first_name} ${dataUser.last_name}`,
        contact_number: dataUser.phone_number,
        date: values[formKeys.createOrder.date],
        time: values[formKeys.createOrder.time],
      },
    });

    doMaterialOrder({ material: dataMaterial });
  }, [stores, dataUser, urlIdPdf, dataSupplier]);

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!dataSupplier || !urlIdPdf || !values || !dataUser || !idOfOrder)
        return;

      const dataStoreSelected = stores?.find(
        itemStore =>
          values[formKeys.createOrder.store] === itemStore.id.toString(),
      );
      if (!dataStoreSelected) return;
      setStoreSelected(dataStoreSelected);

      if (!storeSelected) return;
      sharedMaterialOrder({
        dataShared: {
          emails: [
            storeSelected.email,
            `${dataUser.email}`,
            ...config.emailsToShared,
          ],
          message: config.messageToShared,
          idOrder: idOfOrder,
        },
      });
    },
    [stores],
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
          <CreateOrderForm />
        </Formik>
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>
  );
};
export default OrderForm;
