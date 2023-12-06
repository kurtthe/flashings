import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "./routes";
import {
  AllJobsScreen,
  JobDetailsScreen,
  CreateEditJobScreen,
  OrderSubmittedScreen,
  OrderSummaryScreen
} from "../screens";
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import {  EditIcon,  ProfileIcon } from "@assets/icons";
import IconButton from '@ui/components/IconButton';
import { JobsStackParamsList } from "@features/jobs/navigation/Stack.types";
import { StackPrivateDefinitions } from "@routes/PrivateNavigator";

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<JobsStackParamsList>();

  return (
    <Navigator initialRouteName={Routes.ALL_JOBS}>
      <Screen
        key={Routes.ALL_JOBS}
        name={Routes.ALL_JOBS}
        component={AllJobsScreen}
        options={{
          header: ({navigation}) => (
            <HeaderBox
              rightIcon={
                <IconButton
                  onPress={()=> navigation.navigate(StackPrivateDefinitions.PROFILE)}
                  icon={<Icon as={ProfileIcon} color="black" />}
                />
              }
              title="Jobs"
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
      <Screen
        key={Routes.ORDER_SUBMITTED}
        name={Routes.ORDER_SUBMITTED}
        component={OrderSubmittedScreen}
        options={{
          header: () => null,
        }}
      />
      <Screen
        key={Routes.ORDER_SUMMARY}
        name={Routes.ORDER_SUMMARY}
        component={OrderSummaryScreen}
        options={{
          header: () => (
          <HeaderBox
            mb="s"
            leftIcon={<HeaderBackButton />}
            title="Order Summary"
          />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
