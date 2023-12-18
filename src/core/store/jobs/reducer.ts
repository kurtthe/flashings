import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { JOB_STATE } from "@models";
import { actions } from './actions';
import { persistConfigFlashings } from "@store/config";
import { number } from "yup";

const INITIAL_STATE: JOB_STATE = {
    jobs: [],
    jobsArchive: []
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
    builder.addCase(actions.deleteFlashing, (state, action) =>{
        const {idFlashing, idJob} = action.payload
        state.jobs = state.jobs.map((job)=> {
            return { ...job, flashings: idJob === job.id ? job.flashings.filter((jobFlashing)=> jobFlashing.id !== idFlashing) : job.flashings  }
        })
    });
    builder.addCase(actions.addEditFlashing, (state, action)=>{
        const jobId = action.payload.idJob
        const dataFlashings =  action.payload.flashing

        state.jobs = state.jobs.map((job)=> {
            if(job.id === jobId){
                const existFlashing = job.flashings.find((jFlashing)=> jFlashing.id === dataFlashings.id)
                if(!existFlashing){
                    return {
                        ...job,
                        flashings: [...job.flashings, dataFlashings]
                    }
                }
                return {
                    ...job,
                    flashings: job.flashings.map((flashingJob)=> {
                        if(flashingJob.id === dataFlashings.id){
                            return {
                                ...flashingJob,
                                ...dataFlashings,
                            }
                        }
                        return flashingJob
                    })
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

    builder.addCase(actions.orderSent, (state, action)=>{
        const { idJob: jobId, dataOrder: data } = action.payload
        state.jobs = state.jobs.map((job)=> ({...job, orderData: job.id === jobId ? data: job.orderData}))
    });

    builder.addCase(actions.deleteJob, (state, action)=> {
        const {idJob} = action.payload
        state.jobs = state.jobs.filter((job)=> job.id !== idJob)
    });

    builder.addCase(actions.addLengthJob, (state, action)=> {
        const {idFlashing, dataLength, idJob} = action.payload

        state.jobs = state.jobs.map((job)=> {
            if(job.id === idJob){
                return {
                    ...job,
                    flashings: job.flashings.map((jobFlashing)=> {
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
