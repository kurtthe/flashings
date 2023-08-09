import React from 'react';
import { PublicNavigator } from './PublicNavigator';
import { PrivateNavigator } from '@routes/PrivateNavigator';
import { useAppSelector } from '@hooks/useStore';
import { isAuthenticatedSelector } from '@store/auth/selectors';

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector);

  console.log('=>isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return <PrivateNavigator />;
  }
  return <PublicNavigator />;
};
