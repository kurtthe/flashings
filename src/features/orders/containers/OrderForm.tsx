import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {formKeys, forms} from '../constants';
import CreateOrderForm from '@features/orders/components/CreateOrderForm';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {
  useAddDataJob,
  useGetAccountAndCompany,
  useGetStores,
  useGetSupplier,
} from '@hooks/jobs';

import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {dataUserSelector} from '@store/auth/selectors';
import {RoutesOrders} from '@features/orders/navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {
  getFillOrder,
  getJobOrder,
  getStoreSelectedOrder,
} from '@store/orders/selectors';
import {OrdersStackProps} from '@features/orders/navigation/Stack.types';
import {
  buildDataMaterialOrder,
  mapDataJobToDataPetition,
} from '@features/orders/utils';
import {orderActions} from '@store/orders';
import {
  formKeysOrders,
  optionsDelivery,
} from '@features/orders/constants/order';
import {baseUrlPDF} from '@shared/endPoints';
import {config} from '@env/config';
import {formatDate} from '@shared/utils/formatDate';
import {CreateOrderFormValues} from '@models/order';
import {useCompareVersionApp} from '@hooks/useCompareVersionApp';
import {STORE_BURNED} from '@models/index';

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const refForm = useRef<FormikProps<CreateOrderFormValues>>(null);
  const navigation = useNavigation<OrdersStackProps>();
  const jobOrder = useAppSelector(getJobOrder);
  const fillOrderData = useAppSelector(getFillOrder);
  const dataUser = useAppSelector(dataUserSelector);

  const [dateFormated, setDateFormated] = React.useState<string>();
  const [notes, setNotes] = React.useState<string>();
  const [initialValueForm, setInitialValueForm] = React.useState(
    forms.createOrder.initialValues,
  );
  const [isQuoteOnly, setIsQuoteOnly] = React.useState<boolean>(false);
  const [burdensData, setBurdensData] = React.useState<
    Array<{index: number; value: string}>
  >([]);
  const [addressDelivery, setAddressDelivery] = React.useState<string>('');
  const [deliveryOrPickUp, setDeliveryOrPickUp] =
    React.useState<string>('delivery');

  const {data: dataAccountCompany} = useGetAccountAndCompany();
  const {data: dataSupplier} = useGetSupplier();
  const {data: stores} = useGetStores();
  const {versionApp} = useCompareVersionApp();

  const dataStoreSelected = React.useMemo(() => {
    const store = refForm.current?.values[formKeys.createOrder.store];
    const storesSelected = stores?.find(
      itemStore => store === itemStore.id.toString(),
    );
    if (!storesSelected) {
      return STORE_BURNED;
    }

    dispatch(
      orderActions.setStoreSelected({
        dataStore: storesSelected || STORE_BURNED,
      }),
    );
    return storesSelected;
  }, [stores, refForm.current?.values]);

  const {mutate: createJob, isLoading} = useAddDataJob({
    onSuccess: (data: any) => {
      if (!jobOrder || !dataSupplier || !dataStoreSelected) return;

      const fileName = data.response.file_name;

      const dataMaterial = buildDataMaterialOrder(
        {
          // @ts-ignore
          name: jobOrder.name,
          supplier: dataSupplier.id,
          issued_on: formatDate(new Date(), 'YYYY-MM-DD'),
          // @ts-ignore
          notes: notes,
          description: `${isQuoteOnly ? '*** QUOTE ONLY ***' : ''} Job Name: ${
            jobOrder.name
          } - Job Number: ${jobOrder.id} - Job Address: ${jobOrder.address}`,
          attachments: [
            {
              name: `${jobOrder.name}.pdf`,
              link: `${baseUrlPDF}${fileName}`,
            },
          ],
          delivery_instructions: {
            // @ts-ignore
            delivery: deliveryOrPickUp,
            // @ts-ignore
            location: addressDelivery,
            contact_name: `${dataUser.first_name} ${dataUser.last_name}`,
            // @ts-ignore
            contact_number: dataUser.phone_number,
            // @ts-ignore
            date: dateFormated,
          },
          burdens_data: burdensData,
        },
        jobOrder.flashings,
      );

      dispatch(orderActions.setDataMaterialOrder({data: dataMaterial}));
      dispatch(orderActions.setUrlPDF({url: `${baseUrlPDF}${fileName}`}));
      dispatch(
        orderActions.setMessageEmail({
          message: `${config.messageToShared} 
              ${isQuoteOnly ? '-Quote Only-' : ''}
              Store: ${dataStoreSelected.name}
              Date: ${dateFormated}
              Delivery or pickup: ${deliveryOrPickUp}
              Address ${deliveryOrPickUp}: ${addressDelivery}`,
        }),
      );

      navigation.navigate(RoutesOrders.ORDER_SUMMARY);
    },
  });

  React.useEffect(() => {
    if (!fillOrderData) return;
    //@ts-ignore
    setInitialValueForm({...fillOrderData});
  }, [fillOrderData]);

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!jobOrder || !values || !dataUser || !dataAccountCompany) return;

      //@ts-ignore
      const [day, month, year] = values[formKeys.createOrder.date]?.split('/');
      setDateFormated(`${year}-${month}-${day}`);
      //@ts-ignore
      setNotes(values[formKeys.createOrder.comments]);

      const valueQuoteONly =
        values[formKeysOrders.quote_only] !== ''
          ? // @ts-ignore
            JSON.parse(values[formKeysOrders.quote_only])[0]
          : undefined;

      setIsQuoteOnly(!!valueQuoteONly);
      //@ts-ignore
      setBurdensData(values[formKeysOrders.burdens_data]);

      const addressOrder =
        values[formKeysOrders.deliveryOrPickUp] === optionsDelivery[0]
          ? values[formKeysOrders.address]
          : `${dataStoreSelected.name} (${dataStoreSelected.address}) STORE`;

      setAddressDelivery(addressOrder as string);
      setDeliveryOrPickUp(values[formKeysOrders.deliveryOrPickUp] as string);

      createJob({
        dataJobAndFlashing: mapDataJobToDataPetition(
          jobOrder,
          dataAccountCompany,
          values,
          dataStoreSelected,
          versionApp,
        ),
        howManyFlashings: jobOrder.flashings.length,
      });
      dispatch(orderActions.fillOrder({data: values}));
    },

    [dataSupplier, dataUser, versionApp, dataStoreSelected],
  );

  return (
    <DismissKeyboardPressable>
      <Formik
        innerRef={refForm}
        enableReinitialize
        initialErrors={forms.createOrder.initialErrors}
        initialValues={initialValueForm}
        validationSchema={forms.createOrder.schema}
        onSubmit={handleSubmit}>
        <CreateOrderForm isLoading={isLoading} />
      </Formik>
    </DismissKeyboardPressable>
  );
};
export default OrderForm;
