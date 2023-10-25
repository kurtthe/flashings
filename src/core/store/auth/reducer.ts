import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { AUTH_STATE_TYPE } from '@models';
import { persistConfigAuth } from '../config';
import { actions } from './actions';

const INITIAL_STATE: AUTH_STATE_TYPE = {
  api_key: undefined,
  user: undefined,
  isAuthenticated: false,
  company: undefined,
};

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.signIn, (state, action) => {
    const { data } = action.payload;
    state.isAuthenticated = !!data.api_key;
    state.user = data.user;
    state.api_key = data.api_key;
  });

  builder.addCase(actions.logOut, state => {
    state.api_key = undefined;
    state.isAuthenticated = false;
    state.user = undefined;
    state.company= undefined;
  });

  builder.addCase(actions.setCompany, (state, action) => {
    state.company = action.payload.company
  });
});

export type AuthenticationState = ReturnType<typeof authReducer>;

const persistAuthReducer = persistReducer<AuthenticationState>(
  persistConfigAuth,
  authReducer,
);

export default persistAuthReducer;
