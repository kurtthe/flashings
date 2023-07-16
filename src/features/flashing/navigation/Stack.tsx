import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {
  CreateFlashingScreen,
  GutterFlashingScreen,
  DemoFlashingScreen,
  AllJobsScreen,
} from '../screens';
import {HeaderBackButton, HeaderBox, Icon} from '@ui/components';
import {SearchIcon, CartIcon} from '@assets/icons';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.ALL_JOBS}>
      <Screen
        name={Routes.ALL_JOBS}
        component={AllJobsScreen}
        options={{
          header: () => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              rightIcon={<Icon as={SearchIcon} />}
              title="All Jobs"
            />
          ),
        }}
      />
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
        name={Routes.DEMO}
        component={DemoFlashingScreen}
        options={{
          header: () => null,
        }}
      />
    </Navigator>
  );
};
export default Stack;
