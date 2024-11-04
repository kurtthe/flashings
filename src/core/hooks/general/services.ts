import {RESPONSE_TYPE_VERSION_APP} from '@models';
import {baseURL, endPoints} from '@shared/endPoints';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

export const getVersionApp = async (): Promise<string> => {
  const buildNumber = DeviceInfo.getVersion();

  const response = await axios.get<RESPONSE_TYPE_VERSION_APP>(
    `${baseURL}${endPoints.getVersionApp}`,
    {
      headers: {
        'ttrak-key': 'tt_V2Gzywch2iVbI1KwhHa6pd',
      },
    },
  );

  const version = response.data.latestVersion;
  if (!version) {
    return Promise.resolve(buildNumber);
  }
  return Promise.resolve(version);
};
