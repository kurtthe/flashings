import { createAction } from '@reduxjs/toolkit';
import { DATA_MATERIAL_ORDER, JOB_DATA, STORE } from '@models';

export const actions = {
  jobOrder: createAction<{ job: JOB_DATA }>('orders/jobOrder'),
  setMessageEmail: createAction<{ message: string }>('orders/messageEmail'),
  setUrlPDF: createAction<{ url: string }>('orders/urlPDF'),
  setStoreSelected: createAction<{ dataStore: STORE }>('orders/storeSelected'),
  setDataMaterialOrder: createAction<{ data: DATA_MATERIAL_ORDER }>(
    'orders/dataMaterialOrder',
  ),
  clear: createAction('orders/clear'),
};
