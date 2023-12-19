import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, Box } from '@ui/components';
import Input from '@ui/components/Input';
import SimpleButton from '@components/SimpleButton';
import { Routes } from '../navigation/routes';

const { height, width } = Dimensions.get('screen');

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const LoginSubcontractorScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const navigateTo = routeToGo => {
    navigation.navigate(routeToGo);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.logoAndMainTextContainer}>
            <Image
              style={styles.mainLogo}
              source={require('@assets/logo/MainLogo.png')}
            />
            <Text style={styles.mainTextStyle}>
              Welcome back,{'\n'}
              Please sign in with your code
            </Text>
          </View>
          <View style={{ flex: 3 }}>
            <Input
              label="Code"
              placeholder="Enter your code here"
              onChangeText={text => setCode(text)}
              value={code}
              inputStyles={styles.inputStyle}
              noPadding
            />
          </View>
          <Box flex={2} style={{ justifyContent: 'space-between' }}>
            <Button variant="solid" onPress={() => navigateTo(Routes.LOGIN)}>
              Login
            </Button>
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
                <SimpleButton
                  onPress={() => navigateTo(Routes.LEARN_HOW_TO_OPEN)}>
                  {' '}
                  Learn how to open
                </SimpleButton>
              </View>
            </View>
          </Box>
        </View>
      </DismissKeyboard>
    </KeyboardAwareScrollView>
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
    flex: 2,
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

export default LoginSubcontractorScreen;
