import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';
import { NumberFormat } from 'libphonenumber-js';
import * as Yup from 'yup';

export const customValidationMessages = {
  createEditJob: {
    email: {
      email: 'Invalid email address',
    },
  },
};

// +61423107444
// 0423107444
// 423107444
export const validatePhone = (
  phone: string | undefined,
  numberFormat: NumberFormat = 'NATIONAL',
) =>
  Yup.string()
    .trim()
    .test('phone', 'Phone number is invalid', (value: string | undefined) => {
      if (!value) {
        return false;
      }

      const startWith0 = `${value.charAt(0)}` === '0';
      const lengthNumberNational = startWith0 ? 10 : 9;
      const lengthNationalFormat = 12;

      const clearValue = value.replace(/[\s()-]/g, '');
      const lengthNumber =
        numberFormat === 'NATIONAL' ? lengthNumberNational : 12;
      const lengthFormatNumber =
        numberFormat === 'NATIONAL' ? lengthNationalFormat : 15;

      if (isInteger(Number(clearValue)) && clearValue.length === lengthNumber) {
        const formatedPhone = formatPhone(clearValue, { format: numberFormat });
        if (formatedPhone.length === lengthFormatNumber) return true;
      }

      if (value.length === lengthNumber) {
        const formatedPhone = formatPhone(value, { format: numberFormat });
        if (formatedPhone.length === lengthFormatNumber) return true;
      }

      return false;
    })
    .isValidSync(phone);

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
    [formKeysJobs.jobName]: '',
    [formKeysJobs.jobNumber]: '',
    [formKeysJobs.siteAddress]: '',
    [formKeysJobs.contactName]: '',
    [formKeysJobs.contactNumber]: '',
    [formKeysJobs.contactEmail]: '',
  },
  initialErrors: {
    [formKeysJobs.jobName]: '',
    [formKeysJobs.jobNumber]: '',
    [formKeysJobs.siteAddress]: '',
    [formKeysJobs.contactName]: '',
    [formKeysJobs.contactNumber]: '',
    [formKeysJobs.contactEmail]: '',
  },
  labels: {
    [formKeysJobs.jobName]: 'Job Name',
    [formKeysJobs.jobNumber]: 'Job Number',
    [formKeysJobs.siteAddress]: 'Site Address',
    [formKeysJobs.contactName]: 'Contact Name',
    [formKeysJobs.contactNumber]: 'Contact Number',
    [formKeysJobs.contactEmail]: 'Contact Email',
  },
  placeholders: {
    [formKeysJobs.jobName]: null,
    [formKeysJobs.jobNumber]: null,
    [formKeysJobs.siteAddress]: null,
    [formKeysJobs.contactName]: 'Contact Name',
    [formKeysJobs.contactNumber]: 'Contact Number',
    [formKeysJobs.contactEmail]: 'Contact Email',
  },
  schema: Yup.object({
    [formKeysJobs.jobName]: Yup.string().required('Job Name is required.'),
    [formKeysJobs.jobNumber]: Yup.string(),
    [formKeysJobs.siteAddress]: Yup.string(),
    [formKeysJobs.contactName]: Yup.string(),
    [formKeysJobs.contactNumber]: Yup.string()
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
    [formKeysJobs.contactEmail]: Yup.string()
      .email(customValidationMessages.createEditJob.email.email)
      .ensure()
      .trim()
      .lowercase(),
  }),
};
