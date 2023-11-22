import { combineReducers } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import authReducer from './auth';
import jobsReducer from './jobs'

const combinedRootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
});

function rootReducer(state: any, action: PayloadAction) {
  return combinedRootReducer(state, action);
}

export default rootReducer;
