import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { createJobAndFlashings, getStores, jobService, queryKey } from "./service";
import { DATA_HOOK, STORE } from "@models";

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
	cacheTime: 30 * 60 * 1000,
})


export const useAddDataJob = ({ onSuccess, onSettled, onError }: DATA_HOOK)=> {
	return useMutation(createJobAndFlashings, {
		onSettled,
		onSuccess,
		onError,
	});
}
