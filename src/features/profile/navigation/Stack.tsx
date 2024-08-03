import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes';
import { ProfileParamsList } from '@features/profile/navigation/Stack.types';
import ProfileScreen from '@features/profile/screens/Profile';
import { HeaderBackButton, HeaderBox, Icon } from '@ui/components';
import { Logout } from '@assets/icons';
import { useAppDispatch } from '@hooks/useStore';
import { actions as authActions } from '@store/auth/actions';
import ManageTemplateScreen from '@features/profile/screens/ManageTemplate';
import { isTablet } from '@shared/platform';
import { SIZE_ICON_PHONE, SIZE_ICON_TABLET } from '@theme';

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
                <Icon
                  as={Logout}
                  onPress={handleLogout}
                  color="grayIcon"
                  size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
                />
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
              leftIcon={<HeaderBackButton />}
              title="Manage templates"
            />
          ),
        }}
      />
    </Navigator>
  );
};
export default Stack;
