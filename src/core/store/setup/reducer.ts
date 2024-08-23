import {createReducer} from '@reduxjs/toolkit';
import {actionsSetup as actions} from './actions';

type initialStateType = {
  versionApp: string;
};

const INITIAL_STATE: initialStateType = {
  versionApp: '1.0',
};

const setupReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.versionApp, (state, action) => {
    state.versionApp = action.payload.newVersion;
  });
});

export default setupReducer;
