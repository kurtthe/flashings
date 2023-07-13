import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {CreateFlashingScreen, GutterFlashingScreen} from '../screens';
import {HeaderBackButton, HeaderBox, Icon, Text} from '@ui/components';
import {Animated} from 'react-native';
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
    </Navigator>
  );
};
export default Stack;
