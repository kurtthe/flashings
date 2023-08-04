import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, Box } from '@ui/components';
import SimpleButton from '../../flashing/components/SimpleButton';
import { Routes } from '../navigation/routes';
import LoginForm from '@features/auth/container/LoginForm';

const { width } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {
  const navigateTo = routeToGo => {
    navigation.navigate(routeToGo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoAndMainTextContainer}>
        <Image
          style={styles.mainLogo}
          source={require('@assets/logo/MainLogo.png')}
        />
        <Text style={styles.mainTextStyle}>
          Welcome Back,{'\n'}
          Please sign in with your account
        </Text>
      </View>
      <LoginForm />
      <Box flex={1} justifyContent="space-evenly" alignItems="center">
        <View>
          <SimpleButton
            style={{ marginBottom: 5 }}
            underlined
            onPress={() => navigateTo(Routes.HELP_SUPPORT)}>
            Need Help?
          </SimpleButton>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#444857', fontSize: 15 }}>
              Don't have an account yet?
            </Text>
            <SimpleButton onPress={() => navigateTo(Routes.LEARN_HOW_TO_OPEN)}>
              {' '}
              Learn how to open
            </SimpleButton>
          </View>
        </View>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 35,
  },
  logoAndMainTextContainer: {
    flex: 1.5,
  },
  mainTextStyle: {
    marginVertical: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'left',
    color: '#2E2F33',
    fontSize: 20,
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

export default LoginScreen;
