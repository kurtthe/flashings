import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import {
  LoginScreen,
  LoginSubcontractorScreen,
  ForgotPasswordScreen,
  ForgotPasswordEmailSentScreen,
} from '../screens';
import HelpSupportScreen from '../screens/HelpSupport';
import LearnHowToOpenScreen from '../screens/LearnHowToOpen';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.LOGIN}>
      <Screen
        name={Routes.LOGIN}
        component={LoginScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        name={Routes.SUBCONTRACTOR_LOGIN}
        component={LoginSubcontractorScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        name={Routes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        name={Routes.FORGOT_PASSWORD_EMAIL_SENT}
        component={ForgotPasswordEmailSentScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        name={Routes.HELP_SUPPORT}
        component={HelpSupportScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        name={Routes.LEARN_HOW_TO_OPEN}
        component={LearnHowToOpenScreen}
        options={{
          header: () => null,
        }}
      />
    </Navigator>
  );
};
export default Stack;
