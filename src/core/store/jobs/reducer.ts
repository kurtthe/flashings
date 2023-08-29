import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { JOB_STATE } from "@models";
import { actions } from './actions';
import { persistConfigFlashings } from "@store/config";
import { dataJobs } from "@store/jobs/mocks";

const INITIAL_STATE: JOB_STATE = {
	jobs: dataJobs
};

const flashingReducer = createReducer(INITIAL_STATE, builder => {
	builder.addCase(actions.addJob, (state, action) => {
		const {job}= action.payload;
		state.jobs = [...state.jobs, job]
	});
	builder.addCase(actions.loadJobs, (state, action)=> {
		state.jobs = action.payload.jobs
	})
})

export type FlashingState = ReturnType<typeof flashingReducer>

const persistFlashingReducer = persistReducer<FlashingState>(persistConfigFlashings, flashingReducer)

export default persistFlashingReducer
