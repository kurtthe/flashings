import { createAction } from '@reduxjs/toolkit';
import { SIDE_TAPERED_TYPES } from '@store/flashings/reducer';

export const actions = {
  changeSideTapered: createAction<{ side: SIDE_TAPERED_TYPES }>(
    'changeSideTapered/flashing',
  ),
};
