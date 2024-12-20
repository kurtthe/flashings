import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, Box, KeyboardAvoidingBox, HeaderBox} from '@ui/components';
import LoginForm from '@features/auth/container/LoginForm';
import DismissKeyboardPressable from '@components/forms/DismissKeyboardPressable';
import {checkIsLandscape, isTablet} from '@shared/platform';

const LoginScreen = () => {
  const isLandscape = checkIsLandscape();

  return (
    <>
      <HeaderBox />
      <KeyboardAvoidingBox flex={1}>
        <DismissKeyboardPressable>
          <Box px="m" flex={isLandscape ? 1.5 : 1} backgroundColor="white">
            <Image
              style={styles.mainLogo}
              source={require('@assets/logo/MainLogo.png')}
            />
            <Text style={styles.mainTextStyle}>
              Welcome back,{'\n'}
              Please sign in with your account
            </Text>
          </Box>
          <LoginForm />
        </DismissKeyboardPressable>
      </KeyboardAvoidingBox>
    </>
  );
};

const styles = StyleSheet.create({
  mainTextStyle: {
    marginVertical: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'left',
    color: '#2E2F33',
    fontSize: isTablet ? 24 : 20,
  },
  mainLogo: {
    width: isTablet ? 200 : 142,
    height: isTablet ? 100 : 74,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
