import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const ordersSelector = (state: RootState) => state.orders;

export const getJobOrder = createSelector(ordersSelector, state => {
  return state.job;
});
