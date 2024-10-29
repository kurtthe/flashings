import React from 'react';
import {useAppSelector} from '@hooks/useStore';
import {isAuthenticatedSelector} from '@store/auth/selectors';

import BaseSpinner from '@ui/components/BaseSpinner';

import {useCompareVersionApp} from '@hooks/useCompareVersionApp';

const PublicNavigator = React.lazy(() => import('./PublicNavigator'));
const PrivateNavigator = React.lazy(() => import('./PrivateNavigator'));

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);
  useCompareVersionApp();

  return (
    <React.Suspense fallback={<BaseSpinner />}>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </React.Suspense>
  );
};
