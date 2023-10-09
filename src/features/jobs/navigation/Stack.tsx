import React from 'react';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { Routes } from "./routes";
import { AllJobsScreen, JobDetailsScreen, CreateEditJobScreen } from '../screens';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { Logout, EditIcon, DeleteIcon } from "@assets/icons";
import IconButton from '@ui/components/IconButton';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { RouteProp } from "@react-navigation/native";

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
          header: ({navigation, route}  ) => (
            <HeaderBox
              maxLength={15}
              leftIcon={<HeaderBackButton customPressEvent={() => navigation.navigate(Routes.ALL_JOBS)} />}
              rightIcon={ <IconButton icon={<Icon as={EditIcon} color="black" />} onPress={()=> navigation.navigate(Routes.CREATE_EDIT_JOB, {
                jobId: route.params?.jobId,
              })} />}
              title={route.params?.jobName ?? ''}
            />
          ),
        }}
      />
      <Screen
        key={Routes.CREATE_EDIT_JOB}
        name={Routes.CREATE_EDIT_JOB}
        component={CreateEditJobScreen}
        options={{
          header: ({ route}) => (
            <HeaderBox
              mb="s"
              leftIcon={<HeaderBackButton />}
              title={route.params?.jobId? 'Edit Job': 'New Job'}
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
