import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View,
} from 'react-native';
import { Text, Button, Box } from '@ui/components';
import Input from '@ui/components/Input';
import SimpleButton from '../../flashing/components/SimpleButton';
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
const ForgotPasswordEmailSentScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const navigateTo = routeToGo => {
    navigation.navigate(routeToGo);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={styles.logoAndMainTextContainer}>
            <Image
              style={styles.mainLogo}
              source={require('@assets/logo/MainLogo.png')}
            />
          </View>
          <View
            style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Image
              style={styles.emailImage}
              source={require('@assets/images/emailIconImage.png')}
            />
            <Text style={styles.mainTextStyle}>Email has been Sent!</Text>
            <Text style={styles.infoTextStyle}>
              Please check your email for changes the password
            </Text>
          </View>
          <Box flex={1} style={{ justifyContent: 'space-between' }}>
            <Button variant="solid" onPress={() => navigateTo(Routes.LOGIN)}>
              Login
            </Button>
            <View>
              <SimpleButton
                underlined
                onPress={() => navigateTo(Routes.HELP_SUPPORT)}>
                Need Help?
              </SimpleButton>
            </View>
          </Box>
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
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
  infoTextStyle: {
    color: '#8F94AE',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21.5,
    textAlign: 'center',
  },
  inputStyle: {
    margin: 0,
    borderWidth: 0.5,
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
  emailImage: {
    width: 106,
    height: 106,
    resizeMode: 'contain',
  },
});

export default ForgotPasswordEmailSentScreen;
