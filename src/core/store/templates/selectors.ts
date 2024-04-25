import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const templatesSelector = (state: RootState) => state.templates;

export const templatesList = createSelector(templatesSelector, state => {
  console.log('state.templates', state);
  return state.templates;
});
