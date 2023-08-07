import React from 'react';
import { StyleSheet, Image, Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Box, ScrollBox } from '@ui/components';
import { Routes } from '../navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { SimpleButton } from '@components';
import { AuthStackProps } from '@features/auth/navigation/Stack.types';
import ForgotForm from '@features/auth/container/FortgotForm';

const { width } = Dimensions.get('screen');

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<AuthStackProps>();

  return (
    <ScrollBox
      showsVerticalScrollIndicator={false}
      as={KeyboardAwareScrollView}
      contentContainerStyle={styles.container}>
      <Box py="l" backgroundColor="white" flex={1} px="m">
        <Box mb="s">
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
        <Box flex={2} justifyContent="space-around">
          <View>
            <SimpleButton
              style={{ marginBottom: 5 }}
              underlined
              onPress={() => navigation.navigate(Routes.HELP_SUPPORT)}>
              Need Help?
            </SimpleButton>
            <Box flexDirection="row" justifyContent="center">
              <Text style={{ color: '#444857', fontSize: 15 }}>
                Already remember your password?
              </Text>
              <SimpleButton onPress={() => navigation.navigate(Routes.LOGIN)}>
                Login
              </SimpleButton>
            </Box>
          </View>
        </Box>
      </Box>
    </ScrollBox>
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
  button: {
    marginBottom: 5,
    width: width - 5,
    bottom: 20,
  },
  mainLogo: {
    width: 142,
    height: 74,
    resizeMode: 'contain',
  },
});

export default ForgotPasswordScreen;
