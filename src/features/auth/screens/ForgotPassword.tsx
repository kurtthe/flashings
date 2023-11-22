import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, Box,  KeyboardAvoidingBox, ScreenHeaderBox } from "@ui/components";
import ForgotForm from '@features/auth/container/FortgotForm';
import DismissKeyboardPressable from "@components/forms/DismissKeyboardPressable";

const ForgotPasswordScreen = () => {

  return (
    <KeyboardAvoidingBox flex={1}>
      <ScreenHeaderBox />
      <DismissKeyboardPressable>
      <Box backgroundColor="white" flex={0.5} px="m">
          <Image
            style={styles.mainLogo}
            source={require('@assets/logo/MainLogo.png')}
          />
          <Text style={styles.mainTextStyle}>
            Forgot your current Password?
          </Text>
          <Text style={styles.infoTextStyle}>
            Enter the form to send you an email for changes the password
          </Text>
      </Box>

      <ForgotForm />
      </DismissKeyboardPressable>
    </KeyboardAvoidingBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 35,
  },
  mainTextStyle: {
    marginVertical: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'left',
    color: '#2E2F33',
    fontSize: 20,
  },
  infoTextStyle: {
    color: '#8F94AE',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21.5,
  },
  inputStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E2E9',
  },
  mainLogo: {
    width: 142,
    height: 74,
    resizeMode: 'contain',
  },
});

export default ForgotPasswordScreen;
