import React from 'react';
import { Formik } from 'formik';
import { formKeys, forms } from '../constants';
import CreateOrderForm from '@features/orders/components/CreateOrderForm';
import { KeyboardAvoidingBox } from '@ui/components';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {
  useAddDataJob,
  useGetAccountAndCompany,
  useGetStores,
  useGetSupplier,
} from '@hooks/jobs';

import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { dataUserSelector } from '@store/auth/selectors';
import { RoutesOrders } from '@features/orders/navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { getJobOrder } from '@store/orders/selectors';
import { OrdersStackProps } from '@features/orders/navigation/Stack.types';
import {
  buildDataMaterialOrder,
  mapDataJobToDataPetition,
} from '@features/orders/utils';
import { CreateOrderFormValues } from '@features/orders/type';
import { actions as orderActions } from '@store/orders/actions';
import {
  formKeysOrders,
  optionsDelivery,
} from '@features/orders/constants/order';
import { RESPONSE_CREATE_AND_FLASHING } from '@models';
import { baseUrlPDF } from '@shared/endPoints';

const OrderForm = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<OrdersStackProps>();
  const jobOrder = useAppSelector(getJobOrder);
  const dataUser = useAppSelector(dataUserSelector);

  const [dateFormated, setDateFormated] = React.useState<string>();
  const [notes, setNotes] = React.useState<string>();
  const [isQuoteOnly, setIsQuoteOnly] = React.useState<boolean>(false);
  const [burdensData, setBurdensData] = React.useState<
    Array<{ index: number; value: string }>
  >([]);
  const [addressDelivery, setAddressDelivery] = React.useState<string>('');
  const [deliveryOrPickUp, setDeliveryOrPickUp] =
    React.useState<string>('delivery');

  const { data: dataAccountCompany } = useGetAccountAndCompany();
  const { data: dataSupplier } = useGetSupplier();
  const { data: stores } = useGetStores();

  const { mutate: createJob, isLoading } = useAddDataJob({
    onSuccess: (data: any) => {
      if (!jobOrder || !dataSupplier) return;

      const dataMaterial = buildDataMaterialOrder({
        // @ts-ignore
        name: jobOrder.name,
        supplier: dataSupplier.id,
        // @ts-ignore
        issued_on: dateFormated,
        // @ts-ignore
        notes: notes,
        description: `${isQuoteOnly ? 'Quote Only-' : ''} Job Name: ${
          jobOrder.name
        } - Job Number: ${jobOrder.id} - Job Address: ${jobOrder.address}`,
        attachments: [
          {
            name: `${jobOrder.name}.pdf`,
            link: JSON.stringify(data),
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
      const fileName = data.response.file_name;

      dispatch(orderActions.setDataMaterialOrder({ data: dataMaterial }));
      dispatch(orderActions.setUrlPDF({ url: `${baseUrlPDF}${fileName}` }));

      navigation.navigate(RoutesOrders.ORDER_SUMMARY);
    },
  });

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!jobOrder || !values || !dataUser || !dataAccountCompany) return;

      const dataStoreSelected = stores?.find(
        itemStore =>
          values[formKeys.createOrder.store] === itemStore.id.toString(),
      );
      if (!dataStoreSelected) return;
      dispatch(orderActions.setStoreSelected({ dataStore: dataStoreSelected }));
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
          : `${dataStoreSelected.name} (${dataStoreSelected.address})`;

      setAddressDelivery(addressOrder as string);
      setDeliveryOrPickUp(values[formKeysOrders.deliveryOrPickUp] as string);

      createJob({
        dataJobAndFlashing: mapDataJobToDataPetition(
          jobOrder,
          dataAccountCompany,
          values,
          dataStoreSelected,
        ),
        howManyFlashings: jobOrder.flashings.length,
      });
    },
    [dataSupplier, dataUser],
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
          <CreateOrderForm isLoading={false} />
        </Formik>
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>
  );
};
export default OrderForm;
