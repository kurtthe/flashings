import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { AUTH_STATE_TYPE } from '@models';
import { persistConfigAuth } from '../config';
import { actions } from './actions';

const INITIAL_STATE: AUTH_STATE_TYPE = {
  api_key: undefined,
  user: undefined,
  isAuthenticated: false,
};

const authReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.signIn, (state, action) => {
    console.log('=actions signIN');
    const { data } = action.payload;
    state.isAuthenticated = !!data.api_key;
    state.user = data.user;
    state.api_key = data.api_key;
  });
});

export type AuthenticationState = ReturnType<typeof authReducer>;

const persistAuthReducer = persistReducer<AuthenticationState>(
  persistConfigAuth,
  authReducer,
);

export default persistAuthReducer;
