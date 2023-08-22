import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';

export const customValidationMessages = {
  createJob: {
    email: {
      email: 'Invalid email address',
      required: 'Enter email address',
    },
  },
};

const validatePhone = (phone: string | undefined) =>
  Yup.string()
    .trim()
    .test('phone', 'Phone number is invalid', (value: string | undefined) => {
      if (!value) {
        return false;
      }

      const clearValue = value.replace(/[\s()-]/g, '');
      if (isInteger(Number(clearValue)) && clearValue.length === 10) {
        const formatedPhone = formatPhone(clearValue);
        if (formatedPhone.length === 14) return true;
      }
      if (value.length === 10) {
        const formatedPhone = formatPhone(value);
        if (formatedPhone.length === 14) return true;
      }
      return false;
    })
    .isValidSync(phone);
export const forms = {
  createJob: {
    initialValues: {
      jobName: '',
      jobNumber: '',
      siteAddress: '',
      fileUpload: '',
      contactName: '',
      contactNumber: '',
      contactEmail: '',
    },
    initialErrors: {
      jobName: '',
      jobNumber: '',
      siteAddress: '',
      fileUpload: '',
      contactName: '',
      contactNumber: '',
      contactEmail: '',
    },
    labels: {
      jobName: 'Job Name',
      jobNumber: 'Job Number',
      siteAddress: 'Site Address',
      fileUpload: 'File Upload',
      contactName: 'Contact Name',
      contactNumber: 'Contact Number',
      contactEmail: 'Contact Email',
    },
    placeholders: {
      jobName: 'Job Name',
      jobNumber: 'Job Number',
      siteAddress: 'Site Address',
      fileUpload: 'File Upload',
      contactName: 'Contact Name',
      contactNumber: 'Contact Number',
      contactEmail: 'Contact Email',
    },
    schema: Yup.object({
      jobName: Yup.string().required(),
      jobNumber: Yup.string().required(),
      siteAddress: Yup.string(),
      fileUpload: Yup.string(),
      contactName: Yup.string(),
      contactNumber: Yup.string()
        .required()
        .ensure()
        .trim()
        .lowercase()
        .test('step', 'Phone number', value => validatePhone(value)),
      contactEmail: Yup.string()
        .email(customValidationMessages.createJob.email.email)
        .required(customValidationMessages.createJob.email.required)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
};