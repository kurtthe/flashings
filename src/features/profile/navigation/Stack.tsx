import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { ProfileParamsList } from '@features/profile/navigation/Stack.types';
import ProfileScreen from '@features/profile/screens/Profile';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { Logout, ProfileIcon } from '@assets/icons';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
import ManageTemplateScreen from '@features/profile/screens/ManageTemplate';
import IconButton from '../../../ui/components/IconButton';
import { StackPrivateDefinitions } from '@models/navigation';

const Stack = () => {
  const { Navigator, Screen } = createStackNavigator<ProfileParamsList>();
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(authActions.logOut());

  return (
    <Navigator initialRouteName={Routes.PROFILE}>
      <Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={{
          header: () => (
            <HeaderBox
              leftIcon={<HeaderBackButton />}
              rightIcon={
                <Icon as={Logout} onPress={handleLogout} color="grayIcon" />
              }
              title="Your Profile"
            />
          ),
        }}
      />
      <Screen
        name={Routes.MANAGE_TEMPLATE}
        component={ManageTemplateScreen}
        options={{
          header: ({ navigation }) => (
            <HeaderBox
              rightIcon={
                <IconButton
                  onPress={() =>
                    navigation.navigate(StackPrivateDefinitions.PROFILE)
                  }
                  icon={<Icon as={ProfileIcon} color="black" />}
                />
              }
              title="Manage templates"
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
