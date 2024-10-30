import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store';

const flashingSelector = (state: RootState) => state.flashing;

export const getDataFlashingInformation = createSelector(
  flashingSelector,
  state => {
    return state.flashingData;
  },
);
