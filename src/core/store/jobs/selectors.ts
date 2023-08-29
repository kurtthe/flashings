import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
const jobsSelector = (state: RootState) => state.jobs;
export const jobsList = createSelector(jobsSelector, (state) => state.jobs);
