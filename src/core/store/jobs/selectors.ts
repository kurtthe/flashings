import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { FLASHINGS_DATA } from "@models";

const jobsSelector = (state: RootState) => state.jobs;

export const jobsList = createSelector(jobsSelector,
	(_:any, typeJob: 'current' | 'archived') => typeJob,
	(state, typeJob) => typeJob === 'current' ? state.jobs: state.jobsArchive);

export const jobData = createSelector(jobsSelector,
	(_:any, idJob?: number) => idJob,
	(state, idJob) => {
		if(!idJob) return undefined
		return state.jobs.find((job) => job.id === idJob);
	});

export const getDataFlashing = createSelector(jobsSelector,
	(_:any, dataSelect: {idJob:number; idFlashing?: number}) => dataSelect,
	(state,dataSelect ): undefined | FLASHINGS_DATA=> {
		if(!dataSelect.idFlashing){
			return undefined
		}

		const dataJob =  state.jobs.find(job => job.id === dataSelect.idJob)
		if(!dataJob) {
			return undefined;
		}
		return dataJob.flashings.find(flashing => flashing.id === dataSelect.idFlashing)
})

export const getOrderNumber =  createSelector(jobsSelector,
	(_:any, idJob?: number) => idJob,
	(state, idJob) => {
		if(!idJob) return undefined
		const dataJob =  state.jobs.find((job) => job.id === idJob);
		return dataJob? dataJob.sendOrder: undefined;
	});
