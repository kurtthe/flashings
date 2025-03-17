import {useMutation} from '@tanstack/react-query';
import {addJobsFilesService} from './services';

export const useUploadJobFiles = (
  onSettled?: (data: unknown) => void,
  onError?: (error: unknown) => void,
) => {
  return useMutation(addJobsFilesService, {
    onSuccess: onSettled,
    onError,
  });
};
