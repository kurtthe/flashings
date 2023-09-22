import {createAction} from "@reduxjs/toolkit";
import { FLASHING_LENGTHS, FLASHINGS_DATA, JOB_DATA } from "@models";

export const actions = {
    addJob: createAction<{job:JOB_DATA}>('add/job'),
    loadJobs: createAction<{jobs:JOB_DATA[]}>('load/jobs'),
    loadJobsArchive: createAction<{jobs: JOB_DATA[]}>('load/jobs/archive'),
    addFlashing: createAction<{flashing: FLASHINGS_DATA, idJob: number}>('jobs/add/flashing'),
    changeArchive: createAction<{idJob: number}>('jobs/archive/flashing'),
    changeUnArchive: createAction<{idJob: number}>('jobs/unarchive/flashing'),
    addLengthJob: createAction<{idJob: number, idFlashing: number, dataLength: FLASHING_LENGTHS}>('jobs/length/add/flashing'),
}
