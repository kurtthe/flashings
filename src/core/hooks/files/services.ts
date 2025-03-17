import {endPoints} from '@shared/endPoints';
import {RequestService} from '@services/index';
import {JobFileResponseType} from '@models/index';

export const addJobsFilesService = async ({
  files,
}: {
  files: FormData;
}): Promise<JobFileResponseType> => {
  const response = await RequestService.post<JobFileResponseType, any>(
    endPoints.addJobFile,
    files,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return Promise.resolve(response.body);
};
