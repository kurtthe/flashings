import * as Yup from 'yup';
import {
  customValidationMessages,
  formKeys,
  validatePhone,
} from '@features/jobs/constants/index';

export const formKeysJobs = {
  jobName: 'jobName',
  jobNumber: 'jobNumber',
  siteAddress: 'siteAddress',
  contactName: 'contactName',
  contactNumber: 'contactNumber',
  contactEmail: 'contactEmail',
};

export const createOrEditJobProperties = {
  initialValues: {
    [formKeys.createEditJob.jobName]: '',
    [formKeys.createEditJob.jobNumber]: '',
    [formKeys.createEditJob.siteAddress]: '',
    [formKeys.createEditJob.contactName]: '',
    [formKeys.createEditJob.contactNumber]: '',
    [formKeys.createEditJob.contactEmail]: '',
  },
  initialErrors: {
    [formKeys.createEditJob.jobName]: '',
    [formKeys.createEditJob.jobNumber]: '',
    [formKeys.createEditJob.siteAddress]: '',
    [formKeys.createEditJob.contactName]: '',
    [formKeys.createEditJob.contactNumber]: '',
    [formKeys.createEditJob.contactEmail]: '',
  },
  labels: {
    [formKeys.createEditJob.jobName]: 'Job Name',
    [formKeys.createEditJob.jobNumber]: 'Job Number',
    [formKeys.createEditJob.siteAddress]: 'Site Address',
    [formKeys.createEditJob.contactName]: 'Contact Name',
    [formKeys.createEditJob.contactNumber]: 'Contact Number',
    [formKeys.createEditJob.contactEmail]: 'Contact Email',
  },
  placeholders: {
    [formKeys.createEditJob.jobName]: 'Job Name',
    [formKeys.createEditJob.jobNumber]: 'Job Number',
    [formKeys.createEditJob.siteAddress]: 'Site Address',
    [formKeys.createEditJob.contactName]: 'Contact Name',
    [formKeys.createEditJob.contactNumber]: 'Contact Number',
    [formKeys.createEditJob.contactEmail]: 'Contact Email',
  },
  schema: Yup.object({
    [formKeys.createEditJob.jobName]: Yup.string().required(
      'Job Name is required.',
    ),
    [formKeys.createEditJob.jobNumber]: Yup.string(),
    [formKeys.createEditJob.siteAddress]: Yup.string(),
    [formKeys.createEditJob.contactName]: Yup.string(),
    [formKeys.createEditJob.contactNumber]: Yup.string()
      .required('Contact Number is required')
      .ensure()
      .trim()
      .lowercase()
      .test('step', 'Phone number is invalid', value => {
        const numberInternational = value.includes('+');
        return validatePhone(
          value,
          numberInternational ? 'INTERNATIONAL' : 'NATIONAL',
        );
      }),
    [formKeys.createEditJob.contactEmail]: Yup.string()
      .email(customValidationMessages.createEditJob.email.email)
      .ensure()
      .trim()
      .lowercase(),
  }),
};
