import React from 'react';
import { PublicNavigator } from './PublicNavigator';
import { PrivateNavigator } from '@routes/PrivateNavigator';
import { useAppSelector } from '@hooks/useStore';
import { isAuthenticatedSelector } from '@store/auth/selectors';

export const RootNavigator = () => {
  const isAuthenticatedSelector1 = useAppSelector(isAuthenticatedSelector);

  if (isAuthenticatedSelector1) {
    return <PrivateNavigator />;
  }
  return <PublicNavigator />;
};
