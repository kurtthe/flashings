import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import {
  BoardFlashingScreen,
  CreateEditFlashingScreen,
  CreateRainheadScreen,
} from "../screens";
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { CartIcon } from '@assets/icons';
import { FlashingParamsList } from "@features/flashing/navigation/Stack.types";

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<FlashingParamsList>();

  return (
    <Navigator initialRouteName={Routes.CREATE_EDIT_FLASHING}>
      <Screen
        name={Routes.CREATE_EDIT_FLASHING}
        component={CreateEditFlashingScreen}
        options={{
          header: ({navigation, route}) => (
            <HeaderBox
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()} />}
              title={route.params?.idFlashing? "Edit Flashing":"New Flashing"}
            />
          ),
        }}
      />
      <Screen
        name={Routes.BOARD_FLASHING}
        component={BoardFlashingScreen}
        options={{
          header: () => (
            <HeaderBox
              leftIcon={<HeaderBackButton  />}
              rightIcon={<Icon as={CartIcon} />}
              title="Draw Flashing"
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
