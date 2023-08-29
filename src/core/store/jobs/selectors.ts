import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
const jobsSelector = (state: RootState) => state.jobs;
export const jobsListArchive = createSelector(jobsSelector, (state) => state.jobsArchive);

export const jobsList = createSelector(jobsSelector,
	(_:any, typeJob: 'current' | 'archived') => typeJob,
	(state, typeJob) => typeJob === 'archived' ?state.jobsArchive: state.jobs);

