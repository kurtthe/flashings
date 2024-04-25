import React from 'react';
import { StackNavigator } from '@navigators/index';
import { routes as stackRoutes } from './routes';
import { StackPrivateDefinitions } from '@models/navigation';

const config = {
  routes: stackRoutes,
  initialRouteName: StackPrivateDefinitions.JOBS,
};

export const StackNavigatorPrivate = () => {
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
