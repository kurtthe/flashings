import React, {useEffect, useCallback, useMemo} from 'react';
import {useGetVersionApp} from '@hooks/general/useGeneral';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';
import {isAndroid} from '@shared/platform';
import {config} from '@env/config';
import alert from '@services/general-request/alert';

export const useCompareVersionApp = () => {
  const {
    data: remoteVersion,
    refetch: validateVersionApp,
    isRefetching: isLoading,
    isError,
  } = useGetVersionApp();
  const localVersion = DeviceInfo.getVersion();

  const storeUrl = useMemo(
    () => (isAndroid ? config.urlStoreAndroid : config.urlStoreIOS),
    [],
  );

  const openStore = useCallback(() => {
    Linking.canOpenURL(storeUrl)
      .then(supported => {
        if (supported) {
          Linking.openURL(storeUrl).catch(() =>
            alert.show('Error', 'Unable to open the app store.'),
          );
        } else {
          alert.show('Error', 'Unable to open the app store.');
        }
      })
      .catch(err => console.error('Error opening store URL:', err));
  }, [storeUrl]);

  useEffect(() => {
    if (!remoteVersion || localVersion === remoteVersion) return;
    Toast.show({
      position: 'bottom',
      type: 'updateToast',
      onPress: openStore,
      autoHide: false,
    });
  }, [localVersion, remoteVersion, openStore]);

  if (isError) {
    console.error('Failed to fetch remote version');
  }

  return {
    versionApp: localVersion,
    validateVersionApp,
    isLoading,
    isError,
  };
};
