import React from 'react';
import { Formik, FormikProps } from 'formik';
import { formKeys, forms } from "../constants";
import { CreateEditFormValues } from '@features/jobs/containers/types';
import CreateJobForm from '@features/jobs/components/CreateJobForm';
import { Box } from '@ui/components';
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { actions } from '@store/jobs/actions';
import { getRandomInt } from "@shared/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJobs, Routes } from "@features/jobs/navigation/routes";
import { dataUserSelector } from "@store/auth/selectors";
import { jobData } from "@store/jobs/selectors";

const JobFormContainer = () => {
  const navigation = useNavigation<JobStackProps>()
  const route = useRoute<RouteProp<JobsStackParamsList, RoutesJobs.CREATE_EDIT_JOB>>();

  const formikRef = React.useRef<FormikProps<CreateEditFormValues>>(null);
  const dispatch = useAppDispatch();
  const dataUser = useAppSelector(dataUserSelector);

  const { jobId } = route.params;
  const dataJob = useAppSelector((state) => jobData(state, jobId));

  const handleSubmit = React.useCallback(
    async (values: CreateEditFormValues) => {
      const {
        jobName,
        jobNumber,
        siteAddress,
        fileUpload,
        contactName,
        contactNumber,
        contactEmail} = values;

      const idJob = !jobId? getRandomInt(): jobId
      const dataJob = {
        name: jobName,
        number: jobNumber,
        address: siteAddress,
        file_upload: fileUpload,
        contact:{
          name: contactName,
          number: contactNumber,
          email: contactEmail
        },
      }

      if(!jobId){
        dispatch(actions.addJob({job: { ...dataJob,
            id: idJob,
            sendOrder: undefined,
            flashings: [],
            rain_heads: [],
            sumbs: []
          }}))
      }
      else{
        dispatch(actions.editJob({
          idJob: jobId,
          newDataJob: dataJob
        }))
      }
      navigation.navigate(Routes.JOB_DETAILS, {jobId: idJob, jobName: dataJob.name })
    },
    [],
  );

  const loadInitialValues = React.useMemo(()=>{
      if(!dataJob){
        return {
          ...forms.createEditJob.initialValues,
          [formKeys.createEditJob.contactName]: `${dataUser?.first_name} ${dataUser?.last_name}`,
          [formKeys.createEditJob.contactEmail]: dataUser?.email,
          [formKeys.createEditJob.contactNumber]: dataUser?.phone_number
        }
      }
      return {
        [formKeys.createEditJob.siteAddress]: dataJob.address,
        [formKeys.createEditJob.jobNumber]: dataJob.number,
        [formKeys.createEditJob.jobName]: dataJob.name,
        [formKeys.createEditJob.contactName]: dataJob.contact.name,
        [formKeys.createEditJob.contactEmail]: dataJob.contact.email,
        [formKeys.createEditJob.contactNumber]: dataJob.contact.number,
      }
  }, [dataJob])

  return (
    <Box flex={1} p="m" pt="xl" backgroundColor="white">
      <Formik
        enableReinitialize
        innerRef={formikRef}
        initialValues={loadInitialValues}
        initialErrors={forms.createEditJob.initialErrors}
        validationSchema={forms.createEditJob.schema}
        onSubmit={handleSubmit}>
        <CreateJobForm labelButton={jobId? 'Edit Job': 'Create Job'} jobId={jobId}  />
      </Formik>
    </Box>
  );
};

export default JobFormContainer;
