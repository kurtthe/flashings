import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
const jobsSelector = (state: RootState) => state.jobs;

export const jobsList = createSelector(jobsSelector,
	(_:any, typeJob: 'current' | 'archived') => typeJob,
	(state, typeJob) => typeJob === 'current' ? state.jobs: state.jobsArchive);

export const jobData = createSelector(jobsSelector,
	(_:any, idJob: number) => idJob,
	(state, idJob) => state.jobs.find((job)=> job.id === idJob));
