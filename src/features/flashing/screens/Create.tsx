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
import Input from '@ui/components/Input';

const CreateFlashingScreen = () => {
  return (
    <>
      <AppStatusBar backgroundColor={'white'}/>
      <HeaderBox
        mb="s"
        leftIcon={<HeaderBackButton customPressEvent={() => null} />}
        centerText={
          <Text as={Animated.Text} variant="subheadBold" ml="m">
            New Flashing
          </Text>
        }
      />
      <Box mt="2xl" p="m">
        <Input label="Name" style={{marginBottom: 20}} />
        <Input label="Colour/material" style={{marginBottom: 20}} />
        <Input label="Qty" style={{marginBottom: 20}}  />
      </Box>
    </>
  );
};
export default CreateFlashingScreen;
