import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const templatesSelector = (state: RootState) => state.templates;

export const templatesList = createSelector(
  templatesSelector,
  state => state.templates,
);
export const templateSelected = createSelector(templatesSelector, state => {
  return state.templates.find(item => item.id === state.templateSelected);
});
