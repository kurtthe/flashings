import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  View
} from 'react-native';
import {
  Text,
  Button,
  Box,
} from '@ui/components';
import Input from '@ui/components/Input';
import SimpleButton from '../components/SimpleButton';
import { Routes } from '../navigation/routes';

const { height, width } = Dimensions.get('screen');

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('')

  const navigateTo = (routeToGo) =>{navigation.navigate(routeToGo)}

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <DismissKeyboard>
          <View style={styles.container}>
            <View style={styles.logoAndMainTextContainer}>
              <Image
                style={styles.mainLogo}
                source={require('../../../assets/logo/Burdens.png')}
              />
              <Image
                style={styles.bottomLogo}
                source={require('../../../assets/logo/FlashingDesigner.png')}
              />
              <Text
                style={styles.mainTextStyle}
              >
                Forgot your current Password?
              </Text>
              <Text
                style={styles.infoTextStyle}
              >
                Enter the form to send you an email for changes the password
              </Text>
            </View>
            <View style={{flex: 4}}>
              <Input
                label="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                inputStyles={styles.inputStyle}
                noPadding
              />
            </View>
            <Box
              flex={2} style={{ justifyContent: 'space-around'}}
            >
              <Button
                variant="solid"
                onPress={() => navigateTo(Routes.FORGOT_PASSWORD_EMAIL_SENT)}
              >
                Send Email
              </Button>
              <View>
                <SimpleButton underlined onPress={() => navigateTo(Routes.HELP_SUPPORT)}>
                  Need Help?
                </SimpleButton>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                  <Text style={{color: '#444857', fontSize: 15}}>
                    Already remember your password?
                  </Text>
                  <SimpleButton onPress={() => navigateTo(Routes.LOGIN)}>
                    {' '}
                    Login
                  </SimpleButton>
                </View>
              </View>
            </Box>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 35
  },
  logoAndMainTextContainer: {
    flex: 2,
  },
  mainTextStyle: {
    marginVertical: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'left',
    color: "#2E2F33",
    fontSize: 20
  },
  infoTextStyle: {
    color: '#8F94AE',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21.5
  },
  inputStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E1E2E9"
  },
  button: {
    marginBottom: 5,
    width: width - 5,
    bottom: 20,
  },
  mainLogo: {
    width: 130,
    height: 47,
    resizeMode: 'contain',
  },
  bottomLogo: {
    width: 142,
    height: 27,
    resizeMode: 'contain',
  },
});

export default ForgotPasswordScreen;
