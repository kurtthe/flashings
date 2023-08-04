import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { AllJobsScreen, JobDetailsScreen, CreateJobScreen } from '../screens';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      initialRouteName={Routes.ALL_JOBS}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={Routes.ALL_JOBS} component={AllJobsScreen} />
      <Screen name={Routes.JOB_DETAILS} component={JobDetailsScreen} />
      <Screen name={Routes.CREATE_JOB} component={CreateJobScreen} />
    </Navigator>
  );
};
export default Stack;
