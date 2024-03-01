import {
	DATA_MATERIAL_ORDER,
	JOB_DATA,
	RESPONSE_BALANCE,
	RESPONSE_COMPANY_ACCOUNT,
	RESPONSE_CREATE_AND_FLASHING,
	RESPONSE_MATERIAL_ORDER,
	RESPONSE_SHARED_DATA_MATERIAL_ORDER,
	SHARED_DATA_MATERIAL_ORDER,
	STORE,
	STORE_RESPONSE,
	SUPPLIER
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
		template_id: "BLAN309970",
		landscape: true,
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
	return  {
		company,
		account
	}
}

export const getSupplier = async (): Promise<SUPPLIER> => {
	const response = await RequestService.get<SUPPLIER>(endPoints.getSupplier)
	return Promise.resolve(response.body)
}

export const createMaterialOrder = async ({material}:{ material: DATA_MATERIAL_ORDER }): Promise<RESPONSE_MATERIAL_ORDER> => {
	const response = await RequestService.put<RESPONSE_MATERIAL_ORDER,{data: DATA_MATERIAL_ORDER}>(endPoints.createMaterialOrder, {data: material})
	return Promise.resolve(response.body)
}

export const sendToStore = async ({dataShared}:{ dataShared: {idOrder: number} & SHARED_DATA_MATERIAL_ORDER }): Promise<RESPONSE_SHARED_DATA_MATERIAL_ORDER> => {
	const url = endPoints.shareMaterialOrder.replace(':id', `${dataShared.idOrder}`)
	const response = await RequestService.post<RESPONSE_SHARED_DATA_MATERIAL_ORDER,SHARED_DATA_MATERIAL_ORDER>(url, {emails: dataShared.emails, message: dataShared.message})
	return Promise.resolve(response.body)
}

export const queryKey = {
	get_stores: 'get_stores',
	get_accounts_company: 'get_accounts_company',
	get_supplier: 'get_supplier',
}


