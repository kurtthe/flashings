import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from "./routes";
import { AllJobsScreen, JobDetailsScreen, CreateJobScreen } from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { Logout, SearchIcon } from '@assets/icons';
import IconButton from '../../../ui/components/IconButton';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
import { JobsStackParamsList } from "@features/jobs/navigation/Stack.types";

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<JobsStackParamsList>();
  const dispatch = useAppDispatch();

  const handleLogout = () => dispatch(authActions.logOut());

  return (
    <Navigator initialRouteName={Routes.ALL_JOBS}>
      <Screen
        key={Routes.ALL_JOBS}
        name={Routes.ALL_JOBS}
        component={AllJobsScreen}
        options={{
          header: () => (
            <HeaderBox
              rightIcon={
                <IconButton
                  onPress={handleLogout}
                  icon={<Icon as={Logout} />}
                />
              }
              leftIcon={<Icon as={SearchIcon} />}
              title="All Jobs"
            />
          ),
        }}
      />

      <Screen
        key={Routes.JOB_DETAILS}
        name={Routes.JOB_DETAILS}
        component={JobDetailsScreen}
        options={{
          header: ({navigation, route}) => (
            <HeaderBox
              maxLength={14}
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.goBack()} />}
              title={route.params ? route.params.item?.name: ''}
            />
          ),
        }}
      />
      <Screen
        key={Routes.CREATE_JOB}
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
