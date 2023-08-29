import { JOB_DATA } from "@models";

export const jobService = (dataJob:JOB_DATA ): Promise<JOB_DATA> => {
	return Promise.resolve(dataJob);
}
