import React from 'react';
import { Formik, FormikProps } from 'formik';
import { forms } from '../constants';
import { CreateFormValues } from '@features/jobs/containers/types';
import CreateJobForm from '@features/jobs/components/CreateJobForm';
import { Box } from '@ui/components';

const JobFormContainer = () => {
  const formikRef = React.useRef<FormikProps<CreateFormValues>>(null);

  const handleSubmit = React.useCallback(
    async (values: CreateFormValues) => {},
    [],
  );

  return (
    <Box flex={1} p="m" backgroundColor="white">
      <Formik
        innerRef={formikRef}
        initialValues={{
          ...forms.createJob.initialValues,
        }}
        initialErrors={forms.createJob.initialErrors}
        validationSchema={forms.createJob.schema}
        onSubmit={handleSubmit}>
        <CreateJobForm />
      </Formik>
    </Box>
  );
};

export default JobFormContainer;
