import { createAction } from '@reduxjs/toolkit';
import { SIDE_TAPERED_TYPES } from '@store/flashings/reducer';
import { FLASHINGS_DATA, TYPE_END_LINES } from '@models';

export const actions = {
  changeSideTapered: createAction<{ side: SIDE_TAPERED_TYPES }>(
    'changeSideTapered/flashing',
  ),
  changeStep: createAction<{ step: number }>('changeStep/flashing'),
  addFlashingDraft: createAction<{
    dataFlashing: FLASHINGS_DATA;
    jobId: number;
    step?: number;
  }>('addDraft/flashing'),
  updateFlashingDraft: createAction<{
    dataFlashing: Partial<FLASHINGS_DATA>;
  }>('updateDraft/flashing'),
  changeStartTypeLine: createAction<{ newType: TYPE_END_LINES }>(
    'changeStartTypeLine/flashing',
  ),
  changeEndTypeLine: createAction<{ newType: TYPE_END_LINES }>(
    'changeEndTypeLine/flashing',
  ),
  clear: createAction('clear/flashing'),
};
