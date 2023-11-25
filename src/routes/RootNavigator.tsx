import React from 'react';
import { useAppSelector } from '@hooks/useStore';
import { isAuthenticatedSelector } from '@store/auth/selectors';
import BaseSpinner from "@ui/components/BaseSpinner";

const PublicNavigator = React.lazy(() => import('./PublicNavigator'));
const PrivateNavigator = React.lazy(() => import('@routes/PrivateNavigator'));
export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  return (
    <React.Suspense fallback={<BaseSpinner />}>
      {isAuthenticated? <PrivateNavigator />: <PublicNavigator />}
    </React.Suspense>
  )
};
