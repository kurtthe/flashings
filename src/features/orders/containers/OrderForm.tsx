import React from 'react';
import {Formik} from 'formik';
import {formKeys, forms} from '../constants';
import CreateOrderForm from '@features/orders/components/CreateOrderForm';
import {KeyboardAvoidingBox} from '@ui/components';
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
import {getJobOrder, getStoreSelectedOrder} from '@store/orders/selectors';
import {OrdersStackProps} from '@features/orders/navigation/Stack.types';
import {
  buildDataMaterialOrder,
  mapDataJobToDataPetition,
} from '@features/orders/utils';
import {CreateOrderFormValues} from '@features/orders/type';
import {actions as orderActions} from '@store/orders/actions';
import {
  formKeysOrders,
  optionsDelivery,
} from '@features/orders/constants/order';
import {baseUrlPDF} from '@shared/endPoints';
import {config} from '@env/config';
import {formatDate} from '@shared/utils/formatDate';
import {getVersionApp} from '@store/setup/selectors';
import Toast from "react-native-toast-message";

const OrderForm = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<OrdersStackProps>();
  const jobOrder = useAppSelector(getJobOrder);
  const dataUser = useAppSelector(dataUserSelector);

  const [dateFormated, setDateFormated] = React.useState<string>();
  const [notes, setNotes] = React.useState<string>();
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
  const storeSelected = useAppSelector(getStoreSelectedOrder);
  const versionApp = useAppSelector(getVersionApp);

  const {mutate: createJob, isLoading} = useAddDataJob({
    onSuccess: (data: any) => {
      if (!jobOrder || !dataSupplier || !storeSelected) return;
      const fileName = data.response.file_name;

      const dataMaterial = buildDataMaterialOrder({
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
      });

      dispatch(orderActions.setDataMaterialOrder({data: dataMaterial}));
      dispatch(orderActions.setUrlPDF({url: `${baseUrlPDF}${fileName}`}));
      dispatch(
        orderActions.setMessageEmail({
          message: `${config.messageToShared} 
              ${isQuoteOnly ? '-Quote Only-' : ''}
              Store: ${storeSelected.name}
              Date: ${dateFormated}
              Delivery or pickup: ${deliveryOrPickUp}
              Address ${deliveryOrPickUp}: ${addressDelivery}`,
        }),
      );

      navigation.navigate(RoutesOrders.ORDER_SUMMARY);
    },
  });

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!jobOrder || !values || !dataUser || !dataAccountCompany) return;
      console.log('first condition pass=>');

      const dataStoreSelected = stores?.find(
        itemStore =>
          values[formKeys.createOrder.store] === itemStore.id.toString(),
      );
      if (!dataStoreSelected || !versionApp) {
        Toast.show({
          position: 'bottom',
          text1: 'Please try again',
          type: 'info',
        });
        return;
      }

      dispatch(orderActions.setStoreSelected({dataStore: dataStoreSelected}));
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
    },
    [dataSupplier, dataUser, versionApp],
  );

  return (
    <KeyboardAvoidingBox>
      <DismissKeyboardPressable>
        <Formik
          enableReinitialize
          initialErrors={forms.createOrder.initialErrors}
          initialValues={forms.createOrder.initialValues}
          validationSchema={forms.createOrder.schema}
          onSubmit={handleSubmit}>
          <CreateOrderForm isLoading={isLoading} />
        </Formik>
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>
  );
};
export default OrderForm;
