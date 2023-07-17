import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {
  CreateFlashingScreen,
  GutterFlashingScreen,
  DemoFlashingScreen,
  DemoBoardScreen,
} from '../screens';
import {HeaderBackButton, HeaderBox, Icon} from '@ui/components';
import {CartIcon} from '@assets/icons';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.CREATE_FLASHING}>
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
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title="demo event"
            />
          ),
        }}
      />
      <Screen
        name={Routes.DEMO_BOARD}
        component={DemoBoardScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              rightIcon={<Icon as={CartIcon} />}
              title="demo board"
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
