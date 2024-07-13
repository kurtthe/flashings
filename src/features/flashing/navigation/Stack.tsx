import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import {
  BoardFlashingScreen,
  CreateEditFlashingScreen,
  CreateRainheadScreen,
  TemplatesScreen,
} from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { CartIcon } from '@assets/icons';
import { FlashingParamsList } from '@features/flashing/navigation/Stack.types';
import { Alert } from 'react-native';
import { useAppDispatch } from '@hooks/useStore';
import { actions as flashingActions } from '@store/flashings/actions';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<FlashingParamsList>();
  const dispatch = useAppDispatch();

  return (
    <Navigator initialRouteName={Routes.CREATE_EDIT_FLASHING}>
      <Screen
        name={Routes.CREATE_EDIT_FLASHING}
        component={CreateEditFlashingScreen}
        options={{
          header: ({ navigation, route }) => (
            <HeaderBox
              leftIcon={<HeaderBackButton />}
              title={
                // @ts-ignore
                route.params?.idFlashing ? 'Edit Flashing' : 'New Flashing'
              }
            />
          ),
        }}
      />
      <Screen
        name={Routes.BOARD_FLASHING}
        component={BoardFlashingScreen}
        options={{
          header: ({ navigation }) => {
            const alertDelete = () =>
              Alert.alert(
                'Are you sure you want to continue? ',
                'The data will not be saved.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      navigation.goBack();
                      dispatch(flashingActions.changeStep({ step: 0 }));
                    },
                  },
                ],
              );

            return (
              <HeaderBox
                leftIcon={<HeaderBackButton customPressEvent={alertDelete} />}
                rightIcon={<Icon as={CartIcon} color="grayIcon" />}
                title="Draw Flashing"
              />
            );
          },
        }}
      />
      <Screen
        name={Routes.CREATE_RAINHEAD}
        component={CreateRainheadScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderBox
              mb="s"
              leftIcon={
                <HeaderBackButton
                  customPressEvent={() => navigation.goBack()}
                />
              }
              title="New Rainhead"
            />
          ),
        }}
      />
      <Screen
        name={Routes.LIST_TEMPLATES}
        component={TemplatesScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderBox
              mb="s"
              leftIcon={
                <HeaderBackButton
                  customPressEvent={() => navigation.goBack()}
                />
              }
              title="Templates"
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
