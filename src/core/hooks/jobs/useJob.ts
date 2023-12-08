import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createJobAndFlashings, getCompanyAndAccount, getStores, jobService, queryKey } from "./service";
import { DATA_HOOK, RESPONSE_COMPANY_ACCOUNT, STORE } from "@models";

export const useAddJob = ({ onSuccess, onSettled, onError }: DATA_HOOK) => {
	return useMutation(jobService, {
		onSettled,
		onSuccess,
		onError,
	});
};


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
})
