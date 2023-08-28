import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import {
  CreateFlashingScreen,
  GutterFlashingScreen,
} from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { CartIcon } from '@assets/icons';
import GutterFlashingExamples from '../screens/GutterFlashingExamples';
import CreateRainheadScreen from '../screens/CreateRainhead';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.GUTTER_FLASHING}>
      <Screen
        name={Routes.CREATE_FLASHING}
        component={CreateFlashingScreen}
        options={{
          header: () => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title="New Flashing"
            />
          ),
        }}
      />
      <Screen
        name={Routes.GUTTER_FLASHING}
        component={GutterFlashingScreen}
        options={{
          header: () => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              rightIcon={<Icon as={CartIcon} />}
              title="Gutter Flashing"
            />
          ),
        }}
      />
      <Screen
        name={Routes.GUTTER_FLASHING_EXAMPLES}
        component={GutterFlashingExamples}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title={'Gutter Flashing'}
            />
          ),
        }}
      />
      <Screen
        name={Routes.CREATE_RAINHEAD}
        component={CreateRainheadScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title={'New Rainhead'}
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
