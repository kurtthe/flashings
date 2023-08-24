import React from 'react';
import { Formik, FormikProps } from "formik";
import { AddFlashingFormValues, forms } from "@features/flashing/constants";
import { FormCreateFlashingComponent } from "@features/flashing/components";

const FormCreateFlashingContainer = ()=> {
  const formikRef = React.useRef<FormikProps<AddFlashingFormValues>>(null);

  const handleSubmit = React.useCallback(
    async (
      values: AddFlashingFormValues,
    ) => {
      console.log("=>values", values)
    },
    [],
  );


  return (
    <Formik
      innerRef={formikRef}
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
