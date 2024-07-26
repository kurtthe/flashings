import { DATA_BUILD_MATERIAL_ORDER } from '@features/jobs/types';
import { DATA_MATERIAL_ORDER } from '@models';

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
