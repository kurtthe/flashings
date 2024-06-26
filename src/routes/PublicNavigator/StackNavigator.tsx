import React from 'react';
import { StackNavigator } from '@navigators/index';
import { routes as stackRoutes } from './routes';
import { StackPublicDefinitions } from './types';

const config = {
  routes: stackRoutes,
  initialRouteName: StackPublicDefinitions.AUTH,
};

export const StackNavigatorPublic = () => {
  const routes = Object.entries(config.routes).map(([name, value]) => ({
    ...value,
    name,
  }));

  return (
    <StackNavigator
      initialRouteName={config.initialRouteName}
      screenOptions={{ headerShown: false }}
      routes={routes}
    />
  );
};
