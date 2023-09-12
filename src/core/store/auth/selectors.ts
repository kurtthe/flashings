import { createDraftSafeSelector, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
const authSelector = (state: RootState) => state.auth;

export const getAuthData = createDraftSafeSelector(authSelector, state => ({
  api_key: state.api_key,
  user: state.user,
}));
export const isAuthenticatedSelector = createSelector(
  [getAuthData],
  authData => !!authData.api_key,
);

export const dataUserSelector = createSelector(authSelector, (state => state.user))
