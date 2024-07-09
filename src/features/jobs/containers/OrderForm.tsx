import React from 'react';
import { Formik } from 'formik';
import { forms } from '../constants';
import CreateOrderForm from '@features/jobs/components/CreateOrderForm';
import { CreateOrderFormValues } from '@features/jobs/containers/types';
import { KeyboardAvoidingBox } from '@ui/components';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';

const OrderForm = () => {
  const handleSubmit = React.useCallback((values: CreateOrderFormValues) => {
    console.log('OrderForm ==>', values);
  }, []);

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
