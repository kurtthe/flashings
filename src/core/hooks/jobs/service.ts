import { JOB_DATA, STORE } from "@models";
import { endPoints } from "@shared/endPoints";
import { RequestService } from '@services/index';

export const jobService = (dataJob:JOB_DATA ): Promise<JOB_DATA> => {
	return Promise.resolve(dataJob);
}

export const getStores = async (): Promise<STORE[]>=> {
	const response = await RequestService.get<STORE[]>(endPoints.getStores)
	return Promise.resolve(response.body)
}

export const queryKey = {
	get_stores: 'get_stores'
}
