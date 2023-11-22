import isString from 'lodash/isString';
import { NumberFormat, parsePhoneNumberFromString } from 'libphonenumber-js';
// @ts-ignore
export const formatPhone = (
  phoneNumber: string | undefined,
  { format = 'INTERNATIONAL' }: { format?: NumberFormat } = {},
) => {
  if (!isString(phoneNumber)) return '';
  const phone = parsePhoneNumberFromString(phoneNumber, 'AU');
  return phone?.format(format) ?? '';
};
