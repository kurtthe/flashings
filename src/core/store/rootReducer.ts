import { combineReducers } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import authReducer from './auth';
import flashingReducer from './flashing'

const combinedRootReducer = combineReducers({
  auth: authReducer,
  flashings: flashingReducer,
});

function rootReducer(state: any, action: PayloadAction) {
  return combinedRootReducer(state, action);
}

export default rootReducer;
