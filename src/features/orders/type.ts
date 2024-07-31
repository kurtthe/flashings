import { OptionsType } from '@ui/components';
import { optionsDelivery } from '@features/orders/constants/order';
import * as Yup from 'yup';
import { forms } from '@features/orders/constants';

export const optionsDeliveryOrPickUp: OptionsType[] = [
  {
    value: optionsDelivery[0],
    label: 'Delivery',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
  {
    value: optionsDelivery[1],
    label: 'Pick up',
    bgColor: '#ffffff',
    textColor: 'black',
    bold: false,
    disabled: false,
  },
];

export type CreateOrderFormValues = Yup.InferType<
  typeof forms.createOrder.schema
> & {
  submit?: string;
};
