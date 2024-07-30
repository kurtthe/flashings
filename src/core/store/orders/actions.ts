import { createAction } from '@reduxjs/toolkit';
import { JOB_DATA } from '@models';
import { DATA_BUILD_MATERIAL_ORDER } from '@features/jobs/types';

export const actions = {
  jobOrder: createAction<{ job: JOB_DATA }>('orders/jobOrder'),
  setMessageEmail: createAction<{ message: string }>('orders/messageEmail'),
  setDataMaterialOrder: createAction<{ data: DATA_BUILD_MATERIAL_ORDER }>(
    'orders/dataMaterialOrder',
  ),
  clear: createAction('orders/clear'),
};
