import { createReducer } from '@reduxjs/toolkit';
import { actions } from './actions';
import { DATA_MATERIAL_ORDER, JOB_DATA, STORE } from '@models';

type initialStateType = {
  job: JOB_DATA | undefined;
  messageEmail: string | undefined;
  dataMaterialOrder: DATA_MATERIAL_ORDER | undefined;
  dataStore: STORE | undefined;
};

const INITIAL_STATE: initialStateType = {
  job: undefined,
  messageEmail: undefined,
  dataMaterialOrder: undefined,
  dataStore: undefined,
};

const ordersReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.jobOrder, (state, action) => {
    state.job = action.payload.job;
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
  builder.addCase(actions.clear, state => {
    state.job = undefined;
    state.messageEmail = undefined;
    state.dataMaterialOrder = undefined;
    state.dataStore = undefined;
  });
});

export default ordersReducer;
