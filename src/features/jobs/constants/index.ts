import {
  createOrEditJobProperties,
  formKeysJobs,
} from '@features/jobs/constants/jobs';
import {
  createOrderProperties,
  formKeysOrders,
} from '@features/jobs/constants/order';

export const customValidationMessages = {
  createEditJob: {
    email: {
      email: 'Invalid email address',
    },
  },
};

export const formKeys = {
  createEditJob: formKeysJobs,
  createOrder: formKeysOrders,
};

export const forms = {
  createEditJob: createOrEditJobProperties,
  createOrder: createOrderProperties,
};
