import * as Yup from 'yup';
import { isInteger } from 'lodash';
import { formatPhone } from '@shared/helpers';
import { NumberFormat } from 'libphonenumber-js';
import {
  createOrEditJob,
  createOrEditJobProperties,
  formKeysJobs,
} from '@features/jobs/constants/jobs';

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

export const formKeys = {
  createEditJob: formKeysJobs,
};
export const forms = {
  createEditJob: createOrEditJobProperties,
};
