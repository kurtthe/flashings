import React from 'react';
import { Formik, FormikProps } from 'formik';
import { forms } from '../constants';
import LoginFormComponent from '@features/auth/components/LoginForm';
import { CreateFormValues } from '@features/jobs/containers/types';

const JobFormContainer = () => {
  const formikRef = React.useRef<FormikProps<CreateFormValues>>(null);

  const handleSubmit = React.useCallback(
    async (values: CreateFormValues) => {},
    [],
  );

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        ...forms.createJob.initialValues,
      }}
      initialErrors={forms.createJob.initialErrors}
      validationSchema={forms.createJob.schema}
      onSubmit={handleSubmit}>
      <LoginFormComponent />
    </Formik>
  );
};

export default JobFormContainer;
