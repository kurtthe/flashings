import {combineReducers} from 'redux';
import type {PayloadAction} from '@reduxjs/toolkit';

import authReducer from './auth';
import jobsReducer from './jobs';
import templateReducer from './templates';
import flashingReducer from './flashings';
import ordersReducer from './orders';
import setupReducer from './setup';

const combinedRootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  templates: templateReducer,
  orders: ordersReducer,
  flashing: flashingReducer,
  config: setupReducer,
});

function rootReducer(state: any, action: PayloadAction) {
  return combinedRootReducer(state, action);
}

export default rootReducer;
