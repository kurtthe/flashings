import React from 'react';
import { Formik, FormikProps } from 'formik';
import { forms } from '../constants';
import { CreateFormValues } from '@features/jobs/containers/types';
import CreateJobForm from '@features/jobs/components/CreateJobForm';
import { Box } from '@ui/components';
import { useAppDispatch } from "@hooks/useStore";
import { actions } from '@store/jobs/actions';
import { getRandomInt } from "@shared/utils";
import { useNavigation } from "@react-navigation/native";
import { JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes } from "@features/jobs/navigation/routes";

const JobFormContainer = () => {
  const navigation = useNavigation<JobStackProps>()
  const formikRef = React.useRef<FormikProps<CreateFormValues>>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(
    async (values: CreateFormValues) => {
      const {
        jobName,
        jobNumber,
        siteAddress,
        fileUpload,
        contactName,
        contactNumber,
        contactEmail} = values;

      const dataJob = {
        id: getRandomInt(),
        name: jobName,
        number: jobNumber,
        address: siteAddress,
        file_upload: fileUpload,
        contact:{
          name: contactName,
          number: contactNumber,
          email: contactEmail
        },
        flashings: [],
        rain_heads: [],
        sumbs: []
      }

      dispatch(actions.addJob({job:dataJob }))
      navigation.navigate(Routes.JOB_DETAILS, {jobId: dataJob.id, jobName: dataJob.name })
    },
    [],
  );

  return (
    <Box flex={1} p="m" pt="xl" backgroundColor="white">
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
