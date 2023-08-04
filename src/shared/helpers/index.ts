import isString from 'lodash/isString';
import { NumberFormat, parsePhoneNumberFromString } from 'libphonenumber-js';
import memoize from '@formatjs/fast-memoize';
// @ts-ignore
export const formatPhone = memoize(
  (
    phoneNumber: string | undefined,
    { format = 'NATIONAL' }: { format?: NumberFormat } = {},
  ): string => {
    if (!isString(phoneNumber)) return '';
    const phone = parsePhoneNumberFromString(phoneNumber, 'US');
    return phone?.format(format) || '';
  },
);
