import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store';

const flashingSelector = (state: RootState) => state.board;

export const getBoardFlashingData = createSelector(flashingSelector, state => {
  return state.flashingData;
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
