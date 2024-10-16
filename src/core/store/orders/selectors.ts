import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store';

const ordersSelector = (state: RootState) => state.orders;

export const getJobOrder = createSelector(ordersSelector, state => {
  return state.job;
});

export const getJobNameOrder = createSelector(ordersSelector, state => {
  return state.job?.name;
});

export const getJobIdOrder = createSelector(ordersSelector, state => {
  return state.job?.id;
});

export const getStoreSelectedOrder = createSelector(ordersSelector, state => {
  return state.dataStore;
});

export const getMessageEmailSendToOrder = createSelector(
  ordersSelector,
  state => {
    return state.messageEmail;
  },
);

export const getDataMaterialOrderForSendToStore = createSelector(
  ordersSelector,
  state => {
    return state.dataMaterialOrder;
  },
);

export const getFillOrder = createSelector(ordersSelector, state => {
  return state.fillOrder;
});

export const getUrlPDF = createSelector(ordersSelector, state => {
  return state.urlPdf;
});
