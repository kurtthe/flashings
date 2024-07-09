import * as Yup from 'yup';

export const formKeysOrders = {
  store: 'store',
  date: 'date',
  deliveryOrPickUp: 'delivery',
  time: 'time',
  comments: 'comments',
  address: 'address',
};

export const createOrderProperties = {
  initialValues: {
    [formKeysOrders.store]: '',
    [formKeysOrders.date]: '',
    [formKeysOrders.deliveryOrPickUp]: 'delivery',
    [formKeysOrders.time]: '',
    [formKeysOrders.comments]: '',
    [formKeysOrders.address]: '',
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
  placeholders: {
    [formKeysOrders.store]: 'Store',
    [formKeysOrders.date]: 'Date',
    [formKeysOrders.deliveryOrPickUp]: 'Delivery or Pickup',
    [formKeysOrders.time]: 'PickUp time',
    [formKeysOrders.comments]: 'Comments',
    [formKeysOrders.address]: 'Address for delivery',
  },
  schema: Yup.object({
    [formKeysOrders.store]: Yup.string().required('Store is required.'),
    [formKeysOrders.date]: Yup.string().required('Date is required.'),
    [formKeysOrders.comments]: Yup.string(),
    [formKeysOrders.time]: Yup.string(),
    [formKeysOrders.deliveryOrPickUp]: Yup.mixed()
      .oneOf(['delivery', 'pickup'])
      .required('Delivery or Pickup is required.'),
  }),
};
