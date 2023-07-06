import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {CreateFlashingScreen} from '../screens';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.CREATE_FLASHING}>
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
