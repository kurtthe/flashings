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
import { Alert } from "react-native";
import { actions } from "@store/jobs/actions";

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
              leftIcon={<HeaderBackButton/>}
              title={route.params?.idFlashing? "Edit Flashing":"New Flashing"}
            />
          ),
        }}
      />
      <Screen
        name={Routes.BOARD_FLASHING}
        component={BoardFlashingScreen}
        options={{
          header: ({navigation}) => {
            const alertDelete = () =>
              Alert.alert('Are you sure you want to continue? ', 'The data will not be saved.', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => {
                    navigation.goBack()
                  }},
              ]);

            return (
              <HeaderBox
                leftIcon={<HeaderBackButton customPressEvent={alertDelete}  />}
                rightIcon={<Icon as={CartIcon} color="grayIcon" />}
                title="Draw Flashing"
              />
            )
          },
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
              title='New Rainhead'
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
