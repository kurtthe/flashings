import * as Yup from 'yup';
import { forms } from '../constants';

export type CreateEditFormValues = Yup.InferType<
  typeof forms.createEditJob.schema
> & {
  submit?: string;
};

export type CreateOrderFormValues = Yup.InferType<
  typeof forms.createOrder.schema
> & {
  submit?: string;
};
