import React from 'react';
import {Animated} from 'react-native';
import {
  AppStatusBar,
  Box,
  HeaderBackButton,
  HeaderBox,
  Text,
  Button,
} from '@ui/components';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '@features/flashing/navigation/routes';
import {FLASHINGStackProps} from '@features/flashing/navigation/Stack.types';

const CreateFlashingScreen = () => {
  const navigation = useNavigation<FLASHINGStackProps>();
  return (
    <>
      <AppStatusBar />

      <Box mt="2xl" p="m">
        <Text variant="headerExtraBold">create screen</Text>
        <Button
          mt="l"
          onPress={() => navigation.navigate(Routes.GUTTER_FLASHING)}>
          Go to board
        </Button>
        <Button mt="l" onPress={() => navigation.navigate(Routes.DEMO_BOARD)}>
          Demo draw event move points
        </Button>
      </Box>
    </>
  );
};
export default CreateFlashingScreen;
