import {createAction} from '@reduxjs/toolkit';
import {FLASHINGS_DATA} from '@models';

export const actions = {
  addFlashingDraft: createAction<{
    dataFlashing: FLASHINGS_DATA;
    jobId: number;
  }>('addDraft/flashing'),

  clear: createAction('clear/flashing'),
};
