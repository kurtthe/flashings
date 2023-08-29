import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { JOB_STATE } from "@models";
import { actions } from './actions';
import { persistConfigFlashings } from "@store/config";
import { dataJobs, jobsArchive } from "@store/jobs/mocks";

const INITIAL_STATE: JOB_STATE = {
    jobs: dataJobs,
    jobsArchive: jobsArchive
};

const flashingReducer = createReducer(INITIAL_STATE, builder => {
    builder.addCase(actions.addJob, (state, action) => {
        const {job}= action.payload;
        state.jobs = [...state.jobs, job]
    });
    builder.addCase(actions.loadJobs, (state, action)=> {
        state.jobs = action.payload.jobs
    });
    builder.addCase(actions.loadJobsArchive, (state, action) =>{
        state.jobsArchive = action.payload.jobs
    });
    builder.addCase(actions.addFlashing, (state, action)=>{

    const jobId = action.payload.idJob
    const dataFlashing =  action.payload.flashing

    state.jobs = state.jobs.map((job)=> {
        if(job.id === jobId){
            return {
                ...job,
                flashings: [...job.flashings, dataFlashing]
            }
        }
        return job
    })


    })
})

export type FlashingState = ReturnType<typeof flashingReducer>

const persistFlashingReducer = persistReducer<FlashingState>(persistConfigFlashings, flashingReducer)

export default persistFlashingReducer
