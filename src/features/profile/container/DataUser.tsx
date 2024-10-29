import React from 'react';
import CardProfile from '@features/profile/components/CardProfile';
import {Button} from '@ui/components';
import {actions as authActions} from '@store/auth/actions';
import {useAppDispatch} from '@hooks/useStore';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '@features/profile/navigation/routes';
import {ProfileStackProps} from '@features/profile/navigation/Stack.types';
import {useCompareVersionApp} from '@hooks/useCompareVersionApp';

const DataUser = () => {
  const navigation = useNavigation<ProfileStackProps>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = () => dispatch(authActions.logOut());
  const {versionApp, onCheckVersion} = useCompareVersionApp();

  const onCheckNewVersions = () => {
    setIsLoading(true);
    onCheckVersion();
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <CardProfile />
      <Button mx="m" mb="m" onPress={handleLogout}>
        Logout
      </Button>
      <Button
        variant="outlineWhite"
        mx="m"
        mb="s"
        onPress={() => navigation.navigate(Routes.MANAGE_TEMPLATE)}>
        Manage templates
      </Button>
      <Button mx="m" variant="outlineWhiteSmall" onPress={onCheckNewVersions}>
        {isLoading ? 'Getting the version app...' : `Version ${versionApp}`}
      </Button>
    </>
  );
};
export default DataUser;
