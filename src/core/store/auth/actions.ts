import { createAction } from '@reduxjs/toolkit';
import { LOGIN_RESPONSE } from '@models';

export const actions = {
  signIn: createAction<{ data: LOGIN_RESPONSE }>('auth/signIn'),
  logOut: createAction('auth/logOut'),
};
