import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {CreateFlashingScreen, AllJobsScreen} from '../screens';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.ALL_JOBS}>
      <Screen
        name={Routes.ALL_JOBS}
        component={AllJobsScreen}
        options={{
          title: '',
          header: () => null,
        }}
      />
      <Screen
        name={Routes.CREATE_FLASHING}
        component={CreateFlashingScreen}
        options={{
          title: '',
          header: () => null,
        }}
      />
    </Navigator>
  );
};
export default Stack;
