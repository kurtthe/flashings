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
import {CartIcon} from '@assets/icons';

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
          header: () => null,
        }}
      />
      <Screen
        name={Routes.GUTTER_FLASHING}
        component={GutterFlashingScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
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
