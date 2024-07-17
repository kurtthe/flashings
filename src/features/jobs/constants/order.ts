import * as Yup from 'yup';

export const formKeysOrders = {
  store: 'store',
  date: 'date',
  deliveryOrPickUp: 'deliveryOrPickUp',
  time: 'time',
  comments: 'comments',
  address: 'address',
  burdens_data: 'burdens_data',
};

export const optionsDelivery = ['delivery', 'pickup'];

export const createOrderProperties = {
  initialValues: {
    [formKeysOrders.store]: '',
    [formKeysOrders.date]: '',
    [formKeysOrders.deliveryOrPickUp]: optionsDelivery[0], // Default to 'delivery'
    [formKeysOrders.time]: '',
    [formKeysOrders.comments]: '',
    [formKeysOrders.address]: '',
    [formKeysOrders.burdens_data]: [],
  },
  initialErrors: {
    [formKeysOrders.store]: 'Store is required.',
    [formKeysOrders.date]: 'Date is required.',
    [formKeysOrders.deliveryOrPickUp]: '',
    [formKeysOrders.time]: '',
    [formKeysOrders.comments]: '',
    [formKeysOrders.address]: '',
  },
  labels: {
    [formKeysOrders.store]: 'Store',
    [formKeysOrders.date]: 'Date',
    [formKeysOrders.deliveryOrPickUp]: 'Delivery or Pickup',
    [formKeysOrders.time]: 'Time',
    [formKeysOrders.comments]: 'Comments',
    [formKeysOrders.address]: 'Address',
  },
  placeholders: {},
  schema: Yup.object({
    [formKeysOrders.store]: Yup.string().required('Store is required.'),
    [formKeysOrders.date]: Yup.string().required('Date is required.'),
    [formKeysOrders.comments]: Yup.string(),
    [formKeysOrders.deliveryOrPickUp]: Yup.mixed()
      .oneOf(optionsDelivery)
      .required('Delivery or Pickup is required.'),

    [formKeysOrders.time]: Yup.string().when(
      formKeysOrders.deliveryOrPickUp,
      (values, schemaTime) => {
        // @ts-ignore
        if (values[formKeysOrders.deliveryOrPickUp] === optionsDelivery[1]) {
          return schemaTime.required('Time is required.');
        }
        return schemaTime.notRequired();
      },
    ),
    [formKeysOrders.address]: Yup.string().when(
      formKeysOrders.deliveryOrPickUp,
      (values, schemaTime) => {
        // @ts-ignore
        if (values[formKeysOrders.deliveryOrPickUp] === optionsDelivery[0]) {
          return schemaTime.required('Address is required.');
        }
        return schemaTime.notRequired();
      },
    ),
    [formKeysOrders.burdens_data]: Yup.array().of(
      Yup.object().shape({
        index: Yup.number(),
        value: Yup.string(),
      }),
    ),
  }),
};
