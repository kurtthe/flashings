import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';

export const customValidationMessages = {
  login: {
    email: {
      email: 'Invalid email address',
      required: 'Enter your email address',
    },
    password: {
      required: 'Enter your password',
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
  login: {
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    initialErrors: {
      email: '',
      password: '',
    },
    labels: {
      email: 'Email address',
      password: 'Password',
      remember: 'Remember My Email',
    },
    placeholders: {
      email: 'myemail@email.com',
      password: '••••••••••••••',
    },
    schema: Yup.object({
      email: Yup.string()
        .email(customValidationMessages.login.email.email)
        .required(customValidationMessages.login.email.required)
        .ensure()
        .trim()
        .lowercase(),
      password: Yup.string().required(
        customValidationMessages.login.password.required,
      ),
    }),
  },
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
      jobName: Yup.string(),
      jobNumber: Yup.number(),
      siteAddress: Yup.string(),
      fileUpload: Yup.string(),
      contactName: Yup.string(),
      contactNumber: Yup.string().test('step', 'Phone number', value =>
        validatePhone(value),
      ),
      contactEmail: Yup.string()
        .email(customValidationMessages.login.email.email)
        .required(customValidationMessages.login.email.required)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
};
