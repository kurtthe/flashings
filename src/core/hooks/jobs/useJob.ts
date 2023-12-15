import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
	createJobAndFlashings,
	createMaterialOrder,
	getCompanyAndAccount,
	getStores,
	getSupplier,
	jobService,
	queryKey, sendToStore
} from "./service";
import { DATA_HOOK, RESPONSE_COMPANY_ACCOUNT, STORE, SUPPLIER } from "@models";

export const useGetStores = (): UseQueryResult<STORE[], any> => useQuery({
	queryFn: () => getStores(),
	queryKey: [queryKey.get_stores],
})


export const useAddDataJob = ({ onSuccess, onSettled, onError }: DATA_HOOK)=> {
	return useMutation(createJobAndFlashings, {
		onSettled,
		onSuccess,
		onError,
	});
}

export const useGetAccountAndCompany = (): UseQueryResult<RESPONSE_COMPANY_ACCOUNT, any> => useQuery({
	queryFn: ()=> getCompanyAndAccount(),
	queryKey: [queryKey.get_accounts_company],
	cacheTime: 3600 * 60 * 1000
})


export const useGetSupplier = (): UseQueryResult<SUPPLIER, any> => useQuery({
	queryFn: ()=> getSupplier(),
	queryKey: [queryKey.get_supplier],
})

export const useCreateMaterial = ({ onSuccess, onSettled, onError }: DATA_HOOK)=> {
	return useMutation(createMaterialOrder, {
		onSettled,
		onSuccess,
		onError,
	});
}

export const useSendToStore = ({ onSuccess, onSettled, onError }: DATA_HOOK)=> {
	return useMutation(sendToStore, {
		onSettled,
		onSuccess,
		onError,
	});
}
