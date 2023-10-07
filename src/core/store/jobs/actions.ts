import {createAction} from "@reduxjs/toolkit";
import { FLASHING_LENGTHS, FLASHINGS_DATA, JOB_DATA, JOB_EDIT } from "@models";

export const actions = {
    addJob: createAction<{job:JOB_DATA}>('add/job'),
    editJob: createAction<{idJob: number, newDataJob: JOB_EDIT}>('edit/job'),
    deleteJob: createAction<{idJob: number}>('delete/job'),
    loadJobs: createAction<{jobs:JOB_DATA[]}>('load/jobs'),
    loadJobsArchive: createAction<{jobs: JOB_DATA[]}>('load/jobs/archive'),
    addEditFlashing: createAction<{flashing: FLASHINGS_DATA, idJob: number}>('jobs/add/flashing'),
    changeArchive: createAction<{idJob: number}>('jobs/archive/flashing'),
    changeUnArchive: createAction<{idJob: number}>('jobs/unarchive/flashing'),
    addLengthJob: createAction<{idJob: number, idFlashing: number, dataLength: FLASHING_LENGTHS}>('jobs/add/length/flashing'),
}
