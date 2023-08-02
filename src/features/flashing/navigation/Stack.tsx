import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './routes';
import {
  CreateFlashingScreen,
  GutterFlashingScreen,
  DemoFlashingScreen,
  DemoBoardScreen,
  AllJobsScreen,
} from '../screens';
import {HeaderBackButton, HeaderBox, Icon} from '@ui/components';
import {SearchIcon, CartIcon} from '@assets/icons';
import JobDetailsScreen from '../screens/JobDetail';
import CreateJobScreen from '../screens/CreateJob';
import GutterFlashingExamples from '../screens/GutterFlashingExamples';
import LoginScreen from '../screens/Login';
import LoginSubcontractorScreen from '../screens/LoginSubcontractor';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import HelpSupportScreen from '../screens/HelpSupport';
import ForgotPasswordEmailSentScreen from '../screens/ForgotPasswordEmailSent';
import LearnHowToOpenScreen from '../screens/LearnHowToOpen';
import CreateRainheadScreen from '../screens/CreateRainhead';

const Stack = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.LOGIN}>
      <Screen
        name={Routes.LOGIN}
        component={LoginScreen}
        options={{
          header: () => {},
        }}
      />
      <Screen
        name={Routes.SUBCONTRACTOR_LOGIN}
        component={LoginSubcontractorScreen}
        options={{
          header: () => {},
        }}
      />
      <Screen
        name={Routes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          header: () => {},
        }}
      />
      <Screen
        name={Routes.FORGOT_PASSWORD_EMAIL_SENT}
        component={ForgotPasswordEmailSentScreen}
        options={{
          header: () => {},
        }}
      />
      <Screen
        name={Routes.HELP_SUPPORT}
        component={HelpSupportScreen}
        options={{
          header: () => {},
        }}
      />
      <Screen
        name={Routes.LEARN_HOW_TO_OPEN}
        component={LearnHowToOpenScreen}
        options={{
          header: () => {},
        }}
      />
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
      <Screen
        name={Routes.JOB_DETAILS}
        component={JobDetailsScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title="Micks House"
            />
          ),
        }}
      />
      <Screen
        name={Routes.CREATE_JOB}
        component={CreateJobScreen}
        options={{
          header: () => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton customPressEvent={() => null} />}
              title={"New Job"}
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
              title={"Gutter Flashing"}
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
              title={"New Rainhead"}
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
