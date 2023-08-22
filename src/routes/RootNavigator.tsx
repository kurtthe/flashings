import React from 'react';
import { PublicNavigator } from './PublicNavigator';
import { PrivateNavigator } from '@routes/PrivateNavigator';
import { useAppSelector } from '@hooks/useStore';
import { isAuthenticatedSelector } from '@store/auth/selectors';

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  if (isAuthenticated) {
    return <PrivateNavigator />;
  }
  return <PublicNavigator />;
};
