import { createReducer } from '@reduxjs/toolkit';
import { actions } from './actions';
import { JOB_DATA } from '@models';
import { DATA_BUILD_MATERIAL_ORDER } from '@features/jobs/types';

type initialStateType = {
  job: JOB_DATA | undefined;
  messageEmail: string | undefined;
  dataMaterialOrder: DATA_BUILD_MATERIAL_ORDER | undefined;
};

const INITIAL_STATE: initialStateType = {
  job: undefined,
  messageEmail: undefined,
  dataMaterialOrder: undefined,
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
  builder.addCase(actions.clear, state => {
    state.job = undefined;
    state.messageEmail = undefined;
    state.dataMaterialOrder = undefined;
  });
});

export default ordersReducer;
