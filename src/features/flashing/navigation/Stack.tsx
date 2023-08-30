import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import {
  CreateFlashingScreen,
  GutterFlashingScreen,
} from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { CartIcon } from '@assets/icons';
import CreateRainheadScreen from '../screens/CreateRainhead';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.GUTTER_FLASHING}>
      <Screen
        name={Routes.CREATE_FLASHING}
        component={CreateFlashingScreen}
        options={{
          header: ({navigation}) => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()} />}
              title="New Flashing"
            />
          ),
        }}
      />
      <Screen
        name={Routes.GUTTER_FLASHING}
        component={GutterFlashingScreen}
        options={{
          header: ({navigation}) => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()} />}
              rightIcon={<Icon as={CartIcon} />}
              title="Gutter Flashing"
            />
          ),
        }}
      />
      <Screen
        name={Routes.CREATE_RAINHEAD}
        component={CreateRainheadScreen}
        options={{
          header: ({navigation}) => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()} />}
              title={'New Rainhead'}
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
