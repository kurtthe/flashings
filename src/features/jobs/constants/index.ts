import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';

export const customValidationMessages = {
  createJob: {
    email: {
      email: 'Invalid email address',
    },
  },
};

// 0433773578
// 433758963
// +61433773578

export const validatePhone = (phone: string | undefined) =>
  Yup.string()
    .trim()
    .test('phone', 'Phone number is invalid', (value: string | undefined) => {
      if (!value) {
        return false;
      }
      const clearValue = value.replace(/[\s()-]/g, '');
      if (isInteger(Number(clearValue)) && clearValue.length === 10) {
        const formatedPhone = formatPhone(clearValue);
        if (formatedPhone.length === 12) return true;
      }
      if (value.length === 10) {
        const formatedPhone = formatPhone(value);
        if (formatedPhone.length === 12) return true;
      }
      return false;
    })
    .isValidSync(phone);

export const formKeys = {
  createJob: {
    jobName: 'jobName',
    jobNumber: 'jobNumber',
    siteAddress: 'siteAddress',
    contactName: 'contactName',
    contactNumber: 'contactNumber',
    contactEmail: 'contactEmail',
  },
}
export const forms = {
  createJob: {
    initialValues: {
      [formKeys.createJob.jobName]: '',
      [formKeys.createJob.jobNumber]: '',
      [formKeys.createJob.siteAddress]: '',
      [formKeys.createJob.contactName]: '',
      [formKeys.createJob.contactNumber]: '',
      [formKeys.createJob.contactEmail]: '',
    },
    initialErrors: {
      [formKeys.createJob.jobName]: '',
      [formKeys.createJob.jobNumber]: '',
      [formKeys.createJob.siteAddress]: '',
      [formKeys.createJob.contactName]: '',
      [formKeys.createJob.contactNumber]: '',
      [formKeys.createJob.contactEmail]: '',
    },
    labels: {
      [formKeys.createJob.jobName]: 'Job Name',
      [formKeys.createJob.jobNumber]: 'Job Number',
      [formKeys.createJob.siteAddress]: 'Site Address',
      [formKeys.createJob.contactName]: 'Contact Name',
      [formKeys.createJob.contactNumber]: 'Contact Number',
      [formKeys.createJob.contactEmail]: 'Contact Email',
    },
    placeholders: {
      [formKeys.createJob.jobName]: 'Job Name',
      [formKeys.createJob.jobNumber]: 'Job Number',
      [formKeys.createJob.siteAddress]: 'Site Address',
      [formKeys.createJob.contactName]: 'Contact Name',
      [formKeys.createJob.contactNumber]: 'Contact Number',
      [formKeys.createJob.contactEmail]: 'Contact Email',
    },
    schema: Yup.object({
      [formKeys.createJob.jobName]: Yup.string().required("Job Name is required."),
      [formKeys.createJob.jobNumber]: Yup.string(),
      [formKeys.createJob.siteAddress]: Yup.string(),
      [formKeys.createJob.contactName]: Yup.string(),
      [formKeys.createJob.contactNumber]: Yup.string()
        .required('Contact Number is required')
        .ensure()
        .trim()
        .lowercase()
        .test('step', 'Phone number is invalid', value => validatePhone(value)),
      [formKeys.createJob.contactEmail]: Yup.string()
        .email(customValidationMessages.createJob.email.email)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
};
