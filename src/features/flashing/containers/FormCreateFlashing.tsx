import React from 'react';
import { Formik, } from 'formik';
import { AddFlashingFormValues, forms } from "@features/flashing/constants";
import { FormCreateFlashingComponent } from "@features/flashing/components";

const FormCreateFlashingContainer = ()=> {

  const handleSubmit = React.useCallback(
    async (
      values: AddFlashingFormValues,
    ) => {
      return null
    },
    [],
  );


  return (
    <Formik
      initialValues={{
        ...forms.createFlashing.initialValues,
      }}
      validationSchema={forms.createFlashing.schema}
      onSubmit={handleSubmit}>
      <FormCreateFlashingComponent />
    </Formik>
  )
}
export default FormCreateFlashingContainer
