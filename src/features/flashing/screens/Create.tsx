import React from 'react';
import {Animated} from 'react-native';
import {
  AppStatusBar,
  Box,
  HeaderBackButton,
  HeaderBox,
  Text,
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
      <Box mt="2xl" p="m">
        <Text variant="headerBold">create screen</Text>
      </Box>
    </>
  );
};
export default CreateFlashingScreen;
