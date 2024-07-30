import {
  DATA_MATERIAL_ORDER,
  JOB_DATA,
  RESPONSE_COMPANY_ACCOUNT,
  STORE,
} from '@models';
import { formatDate } from '@shared/utils/formatDate';
import { mapDataFlashing } from '@shared/utils/JobOrders';
import { DATA_BUILD_MATERIAL_ORDER } from '@features/jobs/types';
import { CreateOrderFormValues } from '@features/orders/type';
import {
  formKeysOrders,
  optionsDelivery,
} from '@features/orders/constants/order';

export const mapDataJobToDataPetition = (
  dataJob: JOB_DATA,
  dataAccountCompany: RESPONSE_COMPANY_ACCOUNT,
  dataOrder: CreateOrderFormValues,
  dataStoreSelected: STORE,
) => {
  const restData = mapDataFlashing(dataJob.flashings);
  const valueQuoteONly =
    dataOrder[formKeysOrders.quote_only] !== ''
      ? // @ts-ignore
        JSON.parse(dataOrder[formKeysOrders.quote_only])[0]
      : undefined;

  const addressOrder =
    dataOrder[formKeysOrders.deliveryOrPickUp] === optionsDelivery[0]
      ? dataOrder[formKeysOrders.address]
      : `${dataStoreSelected.name} (${dataStoreSelected.address})`;

  return {
    company_name: dataAccountCompany.company,
    burdens_acount_no: dataAccountCompany.account,
    job_name: dataJob.name,
    site_address: dataJob.address,
    job_number: dataJob.number,
    name: dataJob.contact.name,
    email: dataJob.contact.email,
    phone: dataJob.contact.number,
    order_date: formatDate(new Date(), 'YYYY-MM-DD'),
    required_date: dataOrder[formKeysOrders.date],
    quote_only: valueQuoteONly ? 'Quote Only' : '',
    delivery_method: dataOrder[formKeysOrders.deliveryOrPickUp],
    delivery_address: addressOrder,
    comments: dataOrder[formKeysOrders.comments],
    ...restData,
  };
};

export const buildDataMaterialOrder = (
  data: DATA_BUILD_MATERIAL_ORDER,
): DATA_MATERIAL_ORDER => ({
  ...data,
  status: 'Draft',
  tax_exclusive: true,
  sections: [
    {
      items: [
        {
          description: 'Flashing Order Per Attached Drawing Price TBD',
          quantity: '0.01',
          units: 'ea',
          cost: '0.01',
          tax: [
            {
              name: 'GST',
              rate: 10,
            },
          ],
        },
      ],
    },
  ],
  burdens_data: [],
});
