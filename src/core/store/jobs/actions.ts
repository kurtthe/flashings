import {createAction} from "@reduxjs/toolkit";
import { JOB_DATA } from "@models";

export const actions = {
	addJob: createAction<{job:JOB_DATA}>('add/job'),
	loadJobs: createAction<{jobs:JOB_DATA[]}>('load/jobs'),
	loadJobsArchive: createAction<{jobs: JOB_DATA[]}>('load/jobs/archive'),
}
