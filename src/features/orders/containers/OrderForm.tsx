import React from 'react';
import { Formik } from 'formik';
import { forms } from '../constants';
import CreateOrderForm from '@features/orders/components/CreateOrderForm';
import { KeyboardAvoidingBox } from '@ui/components';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {
  useAddDataJob,
  useGetAccountAndCompany,
  useGetStores,
  useGetSupplier,
} from '@hooks/jobs';

import { useAppSelector } from '@hooks/useStore';
import { dataUserSelector } from '@store/auth/selectors';
import { RoutesOrders } from '@features/orders/navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { getJobOrder } from '@store/orders/selectors';
import { OrdersStackProps } from '@features/orders/navigation/Stack.types';
import { mapDataJobToDataPetition } from '@features/orders/utils';
import { CreateOrderFormValues } from '@features/orders/type';

type Props = {};

const OrderForm: React.FC<Props> = () => {
  const navigation = useNavigation<OrdersStackProps>();
  const jobOrder = useAppSelector(getJobOrder);
  const dataUser = useAppSelector(dataUserSelector);
  const { data: dataAccountCompany } = useGetAccountAndCompany();

  const { mutate: createJob, isLoading } = useAddDataJob({
    onSuccess: data => {
      navigation.navigate(RoutesOrders.ORDER_SUMMARY, {
        responseApi: JSON.stringify(data),
      });
    },
  });

  const { data: stores } = useGetStores();
  const { data: dataSupplier } = useGetSupplier();

  const handleSubmit = React.useCallback(
    (values: CreateOrderFormValues) => {
      if (!jobOrder || !values || !dataUser || !dataAccountCompany) return;

      createJob({
        dataJobAndFlashing: mapDataJobToDataPetition(
          jobOrder,
          dataAccountCompany,
          values,
        ),
        howManyFlashings: jobOrder.flashings.length,
      });
    },
    [dataSupplier, dataUser, stores],
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
