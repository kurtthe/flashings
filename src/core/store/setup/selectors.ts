import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '@store';

const configSelector = (state: RootState) => state.config;

export const getVersionApp = createSelector(configSelector, state => {
  return state.versionApp;
});
