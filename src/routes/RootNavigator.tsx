import React from 'react';
import { useAppSelector } from '@hooks/useStore';
import { isAuthenticatedSelector } from '@store/auth/selectors';
import { useGetVersionApp } from '@hooks/general/useGeneral';

import BaseSpinner from '@ui/components/BaseSpinner';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';

const PublicNavigator = React.lazy(() => import('./PublicNavigator'));
const PrivateNavigator = React.lazy(() => import('./PrivateNavigator'));

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  const { data: versionApp } = useGetVersionApp();
  const buildNumber = DeviceInfo.getBuildNumber();

  React.useEffect(() => {
    console.log('=>versionApp[]', versionApp);
    console.log('=>buildNumber[]', buildNumber);

    if (buildNumber !== versionApp) {
      Toast.show({
        type: 'success',
        text1: 'Please update',
        text2:
          'Please update to continue using the app, we have launched new and faster app.',
      });
    }
  }, [buildNumber, versionApp]);

  return (
    <React.Suspense fallback={<BaseSpinner />}>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </React.Suspense>
  );
};
