import {DATA_MATERIAL_ORDER, JOB_DATA, STORE} from './jobs';

export type FILL_ORDER = {
  store: string;
  date: string;
  deliveryOrPickUp: 'delivery' | 'pickup';
  comments: string;
  address: string;
  burdens_data: Array<{index: number; value: string}>;
};

export type STATE_ORDER_STORE = {
  job: JOB_DATA | undefined;
  messageEmail: string | undefined;
  dataMaterialOrder: DATA_MATERIAL_ORDER | undefined;
  dataStore: STORE | undefined;
  urlPdf: string | undefined;
  fillOrder: FILL_ORDER | undefined;
};
