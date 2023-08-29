import { useMutation } from '@tanstack/react-query';
import { jobService } from './service';
import { DATA_HOOK } from '@models';

export const useAddJob = ({ onSuccess, onSettled, onError }: DATA_HOOK) => {
	return useMutation(jobService, {
		onSettled,
		onSuccess,
		onError,
	});
};
