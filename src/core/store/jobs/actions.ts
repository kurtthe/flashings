import {createAction} from "@reduxjs/toolkit";
import {FLASHINGS_DATA, JOB_DATA} from "@models";

export const actions = {
    addJob: createAction<{job:JOB_DATA}>('add/job'),
    loadJobs: createAction<{jobs:JOB_DATA[]}>('load/jobs'),
    loadJobsArchive: createAction<{jobs: JOB_DATA[]}>('load/jobs/archive'),
    addFlashing: createAction<{flashing: FLASHINGS_DATA, idJob: number}>('jobs/add/flashing'),
}
