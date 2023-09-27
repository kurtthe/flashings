import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';
import { NumberFormat } from "libphonenumber-js";

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
export const validatePhone = (phone: string | undefined, numberFormat: NumberFormat = "NATIONAL") =>
  Yup.string()
    .trim()
    .test('phone', 'Phone number is invalid', (value: string | undefined) => {
      if (!value) {
        return false;
      }

      const startWith0 = `${value.charAt(0)}` === '0'
      const lengthNumberNational = startWith0? 10: 9;
      const lengthNationalFormat = 12

      const clearValue = value.replace(/[\s()-]/g, '');
      const lengthNumber = numberFormat === 'NATIONAL'? lengthNumberNational: 12
      const lengthFormatNumber = numberFormat === 'NATIONAL'? lengthNationalFormat: 15


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
  createEditJob: {
    jobName: 'jobName',
    jobNumber: 'jobNumber',
    siteAddress: 'siteAddress',
    contactName: 'contactName',
    contactNumber: 'contactNumber',
    contactEmail: 'contactEmail',
  },
}
export const forms = {
  createEditJob: {
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
      [formKeys.createEditJob.jobName]: Yup.string().required("Job Name is required."),
      [formKeys.createEditJob.jobNumber]: Yup.string(),
      [formKeys.createEditJob.siteAddress]: Yup.string(),
      [formKeys.createEditJob.contactName]: Yup.string(),
      [formKeys.createEditJob.contactNumber]: Yup.string()
        .required('Contact Number is required')
        .ensure()
        .trim()
        .lowercase()
        .test('step', 'Phone number is invalid', value => {
          const numberInternational = value.includes('+')
          return validatePhone(value, numberInternational? 'INTERNATIONAL': 'NATIONAL');
        }),
      [formKeys.createEditJob.contactEmail]: Yup.string()
        .email(customValidationMessages.createEditJob.email.email)
        .ensure()
        .trim()
        .lowercase(),
    }),
  },
};
