import {
	JOB_DATA,
	RESPONSE_BALANCE,
	RESPONSE_COMPANY_ACCOUNT,
	RESPONSE_CREATE_AND_FLASHING,
	STORE,
	STORE_RESPONSE
} from "@models";
import { endPoints } from "@shared/endPoints";
import { RequestService } from '@services/index';
import axios from "axios";
import { Buffer } from "buffer";

export const jobService = (dataJob:JOB_DATA ): Promise<JOB_DATA> => {
	return Promise.resolve(dataJob);
}

export const getStores = async (): Promise<STORE[]>=> {
	const response = await RequestService.get<STORE_RESPONSE>(endPoints.getStores)
	return Promise.resolve(response.body.locations)
}

export const createJobAndFlashings = async ({ dataJobAndFlashing }: {dataJobAndFlashing:any}):Promise<RESPONSE_CREATE_AND_FLASHING> => {
	const credentials = '53eAdpfCR3ZPfHJthoUxWNA7:';
	const base64Credentials = Buffer.from(credentials).toString('base64');
	const response = await axios.post(endPoints.createJobAndFlashing, {
		template_id: "BLAN946943",
		data: dataJobAndFlashing
	}, {
		headers: {
		'Authorization': `Basic ${base64Credentials}`,
		}
	})
	return Promise.resolve(response.data)
}

export const getCompanyAndAccount = async (): Promise<RESPONSE_COMPANY_ACCOUNT> => {
	const response = await RequestService.get<RESPONSE_BALANCE>(endPoints.getBalance)
	const account = response.body.client_number
	const company = response.headers['tradetrak-company']
	console.log("reponse ready")
	console.log("account::", account)
	console.log("company::", company)
	return  {
		company,
		account
	}
}
export const queryKey = {
	get_stores: 'get_stores',
	get_accounts_company: 'get_accounts_company'
}
