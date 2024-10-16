import {createReducer} from '@reduxjs/toolkit';
import {actions} from './actions';
import {STATE_ORDER_STORE} from '@models';

const INITIAL_STATE: STATE_ORDER_STORE = {
  job: undefined,
  messageEmail: undefined,
  dataMaterialOrder: undefined,
  dataStore: undefined,
  urlPdf: undefined,
  fillOrder: undefined,
};

const ordersReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.jobOrder, (state, action) => {
    state.job = action.payload.job;
  });
  builder.addCase(actions.setUrlPDF, (state, action) => {
    state.urlPdf = action.payload.url;
  });
  builder.addCase(actions.setMessageEmail, (state, action) => {
    state.messageEmail = action.payload.message;
  });
  builder.addCase(actions.setDataMaterialOrder, (state, action) => {
    state.dataMaterialOrder = action.payload.data;
  });
  builder.addCase(actions.setStoreSelected, (state, action) => {
    state.dataStore = action.payload.dataStore;
  });
  builder.addCase(actions.fillOrder, (state, action) => {
    state.fillOrder = action.payload.data;
  });
  builder.addCase(actions.clear, state => {
    state.job = undefined;
    state.messageEmail = undefined;
    state.dataMaterialOrder = undefined;
    state.dataStore = undefined;
    state.urlPdf = undefined;
    state.fillOrder = undefined;
  });
});

export default ordersReducer;
