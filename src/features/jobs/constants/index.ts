import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';
import { NumberFormat } from "libphonenumber-js";

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

export const validatePhone = (phone: string | undefined, numberFormat: NumberFormat = "NATIONAL") =>
  Yup.string()
    .trim()
    .test('phone', 'Phone number is invalid', (value: string | undefined) => {
      if (!value) {
        return false;
      }
      const clearValue = value.replace(/[\s()-]/g, '');
      const lengthNumber = numberFormat === 'NATIONAL'? 10: 12
      const lengthFormatNumber = numberFormat === 'NATIONAL'? 14: 15

      console.log("lengthNumber::", lengthNumber)
      console.log("lengthFormatNumber::", lengthFormatNumber)

      if (isInteger(Number(clearValue)) && clearValue.length === lengthNumber) {
        const formatedPhone = formatPhone(clearValue, {format: numberFormat});
        if (formatedPhone.length === lengthFormatNumber) return true;
      }

      if (value.length === lengthNumber) {
        const formatedPhone = formatPhone(value, {format: numberFormat});
        if (formatedPhone.length === lengthFormatNumber) return true;
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
        .test('step', 'Phone number is invalid', value => {
          const numberInternational = value.includes('+')
          return validatePhone(value, numberInternational? 'INTERNATIONAL': 'NATIONAL');
        }),
      [formKeys.createJob.contactEmail]: Yup.string()
        .email(customValidationMessages.createJob.email.email)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
};
