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
    builder.addCase(actions.editJob, (state, action) => {
        const {idJob, newDataJob}= action.payload;
        state.jobs = state.jobs.map((job) => {
            if(job.id === idJob) {
                return {
                    ...job,
                    ...newDataJob
                }
            }
            return job
        })
    });
    builder.addCase(actions.loadJobs, (state, action)=> {
        state.jobs = action.payload.jobs
    });
    builder.addCase(actions.loadJobsArchive, (state, action) =>{
        state.jobsArchive = action.payload.jobs
    });
    builder.addCase(actions.addFlashing, (state, action)=>{
        const jobId = action.payload.idJob
        const dataFlashings =  action.payload.flashing

        state.jobs = state.jobs.map((job)=> {
            if(job.id === jobId){
                return {
                    ...job,
                    flashings: [...job.flashings, dataFlashings]
                }
            }
            return job
        })
    });
    builder.addCase(actions.changeUnArchive, (state, action)=>{
        const jobId = action.payload.idJob
        const jobToMove = state.jobsArchive.find((job) => job.id === jobId)

        if(!jobToMove) return
        state.jobsArchive = state.jobsArchive.filter((job)=> jobId !== job.id)
        state.jobs = [...state.jobs, jobToMove]
    });

    builder.addCase(actions.changeArchive, (state, action)=>{
        const jobId = action.payload.idJob
        const jobToMove = state.jobs.find((job) => job.id === jobId)

        if(!jobToMove) return
        state.jobs = state.jobs.filter((job)=> jobId !== job.id)
        state.jobsArchive = [...state.jobsArchive, jobToMove]
    });

    builder.addCase(actions.addLengthJob, (state, action)=> {
        const {idFlashing, dataLength, idJob} = action.payload
	    console.log("add length job::", dataLength)
	    console.log("idFlashing::", idFlashing)
	    console.log("idJob::", idJob)

        state.jobs = state.jobs.map((job)=> {
					console.log("job.id::", job.id)
            if(job.id === idJob){
                return {
                    ...job,
                    flashings: job.flashings.map((jobFlashing)=> {
	                    console.log("jobFlashing.id", jobFlashing.id)
	                    console.log("idFlashing", idFlashing)
                        if(jobFlashing.id === idFlashing){
                            return {
                                 ...jobFlashing,
                                 flashingLengths: [...jobFlashing.flashingLengths, dataLength]
                            }
                        }
                        return jobFlashing
                    })
                }
            }
            return job
        })
    })
})

export type FlashingState = ReturnType<typeof flashingReducer>
const persistFlashingReducer = persistReducer<FlashingState>(persistConfigFlashings, flashingReducer)
export default persistFlashingReducer
