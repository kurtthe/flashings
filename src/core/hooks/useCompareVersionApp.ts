import React from 'react';
import {useGetVersionApp} from '@hooks/general/useGeneral';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';
import {isAndroid} from '@shared/platform';
import {config} from '@env/config';
import alert from '@services/general-request/alert';

export const useCompareVersionApp = () => {
  const {data: versionApp, refetch, isRefetching} = useGetVersionApp();
  const buildNumber = DeviceInfo.getVersion();

  const url = React.useMemo(() => {
    if (isAndroid) {
      return config.urlStoreAndroid;
    }
    return config.urlStoreIOS;
  }, [isAndroid]);

  React.useEffect(() => {
    if (!versionApp) return;

    if (buildNumber !== versionApp) {
      Toast.show({
        position: 'bottom',
        type: 'updateToast',
        onPress: openStore,
        autoHide: false,
      });
    }
  }, [buildNumber, versionApp]);

  const openStore = React.useCallback(() => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url).catch(() =>
            alert.show('Error', "Don't know how to open this URL."),
          );
        } else {
          alert.show('Error', "Don't know how to open this URL.");
        }
      })
      .catch(err => console.error('An error occurred', err));
  }, [url]);

  console.log('0=>versionApp::', versionApp);
  return {
    versionApp: buildNumber,
    validateVersionApp: refetch,
    isLoading: isRefetching,
  };
};
