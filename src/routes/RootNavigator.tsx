import React from 'react';
import { PublicNavigator } from './PublicNavigator';
import { useUserAuthenticated } from '@hooks/useUserAuthenticated';
import { PrivateNavigator } from '@routes/PrivateNavigator';

export const RootNavigator = () => {
  const { isLoading, thereToken } = useUserAuthenticated();

  if (!isLoading && thereToken) {
    return <PrivateNavigator />;
  }
  return <PublicNavigator />;
};
