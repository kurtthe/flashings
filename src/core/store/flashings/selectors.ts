import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const flashingSelector = (state: RootState) => state.flashing;

export const getDataFlashingDraft = createSelector(flashingSelector, state => {
  return state.flashingDraft;
});

export const getStep = createSelector(flashingSelector, state => {
  return state.stepIndex;
});

export const getSideTapered = createSelector(flashingSelector, state => {
  return state.sideTaperedFront;
});

export const getIsEdit = createSelector(flashingSelector, state => {
  return state.isEdit;
});
