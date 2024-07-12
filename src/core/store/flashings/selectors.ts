import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { FLASHINGS_DATA } from '@models';

const flashingSelector = (state: RootState) => state.flashing;

export const getDataFlashingDraft = createSelector(flashingSelector, state => {
  return state.flashingDraft;
});

export const getStep = createSelector(flashingSelector, state => {
  return state.stepIndex;
});

export const getSideTapered = createSelector(flashingSelector, state => {
  return state.sideTapered;
});
