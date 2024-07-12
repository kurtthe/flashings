import { createAction } from '@reduxjs/toolkit';
import { SIDE_TAPERED_TYPES } from '@store/flashings/reducer';
import { FLASHINGS_DATA } from '@models';

export const actions = {
  changeSideTapered: createAction<{ side: SIDE_TAPERED_TYPES }>(
    'changeSideTapered/flashing',
  ),
  changeStep: createAction<{ step: number }>('changeStep/flashing'),
  addFlashingDraft: createAction<{ dataFlashing: FLASHINGS_DATA }>(
    'addDraft/flashing',
  ),
  updateFlashingDraft: createAction<{
    dataFlashing: FLASHINGS_DATA;
  }>('updateDraft/flashing'),
  clear: createAction('clear/flashing'),
};
