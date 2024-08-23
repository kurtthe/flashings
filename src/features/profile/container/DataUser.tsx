import React from 'react';
import CardProfile from '@features/profile/components/CardProfile';
import {Button, Card, Text} from '@ui/components';
import {actions as authActions} from '@store/auth/actions';
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import {useNavigation} from '@react-navigation/native';
import {Routes} from '@features/profile/navigation/routes';
import {ProfileStackProps} from '@features/profile/navigation/Stack.types';
import {isTablet} from '@shared/platform';
import { getVersionApp } from "@store/setup/selectors";

const DataUser = () => {
  const navigation = useNavigation<ProfileStackProps>();
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(authActions.logOut());
  const versionApp =  useAppSelector(getVersionApp);

  return (
    <>
      <CardProfile />
      <Button mx="m" mb="m" onPress={handleLogout}>
        Logout
      </Button>
      <Button
        variant="outlineWhite"
        mx="m"
        mb="m"
        onPress={() => navigation.navigate(Routes.MANAGE_TEMPLATE)}>
        Manage templates
      </Button>
      <Card p="s" alignItems="center">
        <Text variant="bodySmallRegular" fontSize={isTablet ? 15 : 13}>
          Version {versionApp}
        </Text>
      </Card>
    </>
  );
};
export default DataUser;
