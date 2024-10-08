import React from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {isAuthenticatedSelector} from '@store/auth/selectors';
import {useGetVersionApp} from '@hooks/general/useGeneral';

import BaseSpinner from '@ui/components/BaseSpinner';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import {Linking} from 'react-native';
import alert from '@services/general-request/alert';
import {isAndroid} from '@shared/platform';
import {config} from '@env/config';
import {actionsSetup} from '@store/setup/actions';

const PublicNavigator = React.lazy(() => import('./PublicNavigator'));
const PrivateNavigator = React.lazy(() => import('./PrivateNavigator'));

export const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const {data: versionApp, refetch} = useGetVersionApp();
  const buildNumber = DeviceInfo.getVersion();

  React.useEffect(() => {
    dispatch(actionsSetup.versionApp({newVersion: buildNumber}));

    if (!versionApp) {
      refetch().catch(() => console.log('error=>'));
      return;
    }

    if (buildNumber !== versionApp) {
      Toast.show({
        position: 'bottom',
        type: 'updateToast',
        onPress: openStore,
        autoHide: false,
      });
    }
  }, [buildNumber, versionApp]);

  const url = React.useMemo(() => {
    if (isAndroid) {
      return config.urlStoreAndroid;
    }
    return config.urlStoreIOS;
  }, [isAndroid]);

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

  return (
    <React.Suspense fallback={<BaseSpinner />}>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </React.Suspense>
  );
};
