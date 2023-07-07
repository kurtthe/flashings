import React from 'react';
import {StackNavigator} from '@navigators/index';
import {routes as stackRoutes} from './routes';
import {StackPublicDefinitions} from './types';

let config = {
  routes: stackRoutes,
  initialRouteName: StackPublicDefinitions.FLASHINGS,
};

export const StackNavigatorPublic = () => {
  const routes = Object.entries(config.routes).map(([name, value]) => ({
    ...value,
    name,
  }));

  return (
    <StackNavigator
      initialRouteName={config.initialRouteName}
      screenOptions={{headerShown: false}}
      routes={routes}
    />
  );
};
