import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store';

const boardSelector = (state: RootState) => state.board;

export const getBoardFlashingData = createSelector(boardSelector, state => {
  return state.flashingData;
});

export const getStep = createSelector(boardSelector, state => {
  return state.stepIndex;
});

export const getSideTapered = createSelector(boardSelector, state => {
  return state.sideTaperedFront;
});

export const getIsEdit = createSelector(boardSelector, state => {
  return state.isEdit;
});

export const getIndexLineSelected = createSelector(boardSelector, state => {
  return state.indexLineSelected;
});

export const getTypeSelected = createSelector(boardSelector, state => {
  return state.typeSelected;
});
