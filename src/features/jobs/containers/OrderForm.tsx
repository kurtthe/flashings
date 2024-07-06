import React from 'react';
import { Formik } from 'formik';
import { forms } from '../constants';
import CreateOrderForm from '@features/jobs/components/CreateOrderForm';
import { CreateOrderFormValues } from '@features/jobs/containers/types';

const OrderForm = () => {
  const handleSubmit = React.useCallback((values: CreateOrderFormValues) => {
    console.log('OrderForm ==>', values);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={forms.createOrder.initialValues}
      onSubmit={handleSubmit}>
      <CreateOrderForm />
    </Formik>
  );
};
export default OrderForm;
