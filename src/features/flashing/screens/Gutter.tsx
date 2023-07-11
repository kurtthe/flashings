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

const CreateFlashingScreen = () => {
  return (
    <>
      <AppStatusBar />
      <HeaderBox
        mb="s"
        justifyContent="flex-start"
        leftIcon={<HeaderBackButton customPressEvent={() => null} />}
        rightIcon={
          <Text as={Animated.Text} variant="subheadBold" ml="m">
            My flashing
          </Text>
        }
      />

      <Box mt="2xl" p="m"></Box>
    </>
  );
};
export default CreateFlashingScreen;
