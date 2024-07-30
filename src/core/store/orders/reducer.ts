import { createReducer } from '@reduxjs/toolkit';
import { actions } from './actions';
import { JOB_DATA } from '@models';

type initialStateType = {
  job: JOB_DATA | undefined;
};

const INITIAL_STATE: initialStateType = {
  job: undefined,
};

const ordersReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.jobOrder, (state, action) => {
    state.job = action.payload.job;
  });
  builder.addCase(actions.clear, (state, action) => {
    state.job = undefined;
  });
});

export default ordersReducer;
