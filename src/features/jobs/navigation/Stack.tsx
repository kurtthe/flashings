import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { AllJobsScreen, JobDetailsScreen, CreateJobScreen } from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { SearchIcon } from '@assets/icons';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={Routes.ALL_JOBS}>
      <Screen
        name={Routes.ALL_JOBS}
        component={AllJobsScreen}
        options={{
          header: () => (
            <HeaderBox rightIcon={<Icon as={SearchIcon} />} title="All Jobs" />
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
              title={'New Job'}
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
