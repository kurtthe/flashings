import { createAction } from '@reduxjs/toolkit';
import { JOB_DATA } from '@models';

export const actions = {
  jobOrder: createAction<{ job: JOB_DATA }>('orders/jobOrder'),
  clear: createAction('orders/clear'),
};
