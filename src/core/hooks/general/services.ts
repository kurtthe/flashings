import { RESPONSE_TYPE_VERSION_APP } from '@models';
import { RequestService } from '@services';
import { endPoints } from '@shared/endPoints';

export const getVersionApp = async (): Promise<string> => {
  const response = await RequestService.get<RESPONSE_TYPE_VERSION_APP>(
    endPoints.getVersionApp,
  );
  return Promise.resolve(response.body.latestVersion);
};
