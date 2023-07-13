import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {CreateFlashingScreen, GutterFlashingScreen} from '../screens';
import {HeaderBackButton, HeaderBox, Text} from '@ui/components';
import {Animated} from 'react-native';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.CREATE_FLASHING}>
      <Screen
        name={Routes.CREATE_FLASHING}
        component={CreateFlashingScreen}
        options={{
          title: '',
          header: () => (
            <HeaderBox
              mb="s"
              justifyContent="flex-start"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              rightIcon={
                <Text as={Animated.Text} variant="subheadBold" ml="m">
                  My flashing
                </Text>
              }
            />
          ),
        }}
      />
      <Screen
        name={Routes.GUTTER_FLASHING}
        component={GutterFlashingScreen}
        options={{
          title: '',
          header: () => (
            <HeaderBox
              mb="s"
              justifyContent="flex-start"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              rightIcon={
                <Text as={Animated.Text} variant="subheadBold" ml="m">
                  GutterFlashing
                </Text>
              }
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
