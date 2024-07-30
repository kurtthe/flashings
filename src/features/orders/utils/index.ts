import {
  DATA_MATERIAL_ORDER,
  JOB_DATA,
  RESPONSE_COMPANY_ACCOUNT,
} from '@models';
import { formatDate } from '@shared/utils/formatDate';
import { mapDataFlashing } from '@shared/utils/JobOrders';
import { DATA_BUILD_MATERIAL_ORDER } from '@features/jobs/types';
import { CreateOrderFormValues } from '@features/orders/type';

export const mapDataJobToDataPetition = (
  dataJob: JOB_DATA,
  dataAccountCompany: RESPONSE_COMPANY_ACCOUNT,
  dataOrder: CreateOrderFormValues,
) => {
  const restData = mapDataFlashing(dataJob.flashings);

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
