import * as Yup from 'yup';

export const formKeysOrders = {
  store: 'store',
  date: 'date',
  deliveryOrPickUp: 'deliveryOrPickUp',
  comments: 'comments',
  address: 'address',
  burdens_data: 'burdens_data',
  quote_only: 'quote_only',
};

export const optionsDelivery = ['delivery', 'pickup'];

export const createOrderProperties = {
  initialValues: {
    [formKeysOrders.store]: '',
    [formKeysOrders.date]: '',
    [formKeysOrders.deliveryOrPickUp]: optionsDelivery[0], // Default to 'delivery'
    [formKeysOrders.comments]: '',
    [formKeysOrders.address]: '',
    [formKeysOrders.quote_only]: '',
    [formKeysOrders.burdens_data]: [],
  },
  initialErrors: {
    [formKeysOrders.store]: 'Store is required.',
    [formKeysOrders.date]: 'Date is required.',
    [formKeysOrders.deliveryOrPickUp]: '',
    [formKeysOrders.comments]: '',
    [formKeysOrders.address]: '',
    [formKeysOrders.quote_only]: '',
  },
  labels: {
    [formKeysOrders.store]: 'Store',
    [formKeysOrders.date]: 'Required Date',
    [formKeysOrders.deliveryOrPickUp]: 'Delivery or Pickup',
    [formKeysOrders.quote_only]: 'Quote only',
    [formKeysOrders.comments]: 'Comments',
    [formKeysOrders.address]: 'Delivery Address',
  },
  placeholders: {},
  schema: Yup.object({
    [formKeysOrders.store]: Yup.string().required('Store is required.'),
    [formKeysOrders.date]: Yup.string().required('Date is required.'),
    [formKeysOrders.comments]: Yup.string(),
    [formKeysOrders.quote_only]: Yup.string(),
    [formKeysOrders.deliveryOrPickUp]: Yup.mixed()
      .oneOf(optionsDelivery)
      .required('Delivery or Pickup is required.'),

    [formKeysOrders.address]: Yup.string(),
    [formKeysOrders.burdens_data]: Yup.array().of(
      Yup.object()
        .shape({
          index: Yup.number(),
          value: Yup.string().required('This field is required.'),
        })
        .required(),
    ),
  }),
};
