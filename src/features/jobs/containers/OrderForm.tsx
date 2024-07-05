import React from 'react';
import { Formik } from 'formik';
import { formKeys, forms } from '../constants';

type Props = {};
const OrderForm = () => {
  const handleSubmit = React.useCallback(() => {}, []);

  return (
    <Formik
      enableReinitialize
      initialValues={forms.createOrder}
      onSubmit={handleSubmit}></Formik>
  );
};
export default OrderForm;
