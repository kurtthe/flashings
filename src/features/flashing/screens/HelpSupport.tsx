import React from 'react';
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
import { Routes } from '../navigation/routes';

const { height, width } = Dimensions.get('screen');

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
  const HelpSupportScreen = ({navigation}) => {
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
                Help Support
              </Text>
            </View>
            <View style={{flex: 3}}>
              <Text
                style={[styles.infoTextStyle, {paddingBottom: 25}]}
              >
                This app is only for Burbend Trade Costumers.{'\n'}{'\n'}
                If you need help to get access to your trade account or open one, Please contact us on:
              </Text>
              <View style={{paddingBottom: 32}}>
                <Text
                  style={[styles.infoTextStyle, {paddingBottom: 5}]}
                >
                  Email
                </Text>
                <Text
                  style={styles.underlinedTextStyle}
                >
                  help@burdens.com.au
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.infoTextStyle, {paddingBottom: 5}]}
                >
                  Phone number
                </Text>
                <Text
                  style={styles.underlinedTextStyle}
                >
                  03 9999 3333
                </Text>
              </View>
            </View>
            <Box
              flex={2} style={{ justifyContent: 'flex-end'}}
            >
              <Button
                variant="solid"
                onPress={() => navigation.goBack()}
              >
                Back
              </Button>
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
    flex: 1.2,
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
  underlinedTextStyle:{
    color: '#444857',
    fontFamily: 'Inter', 
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 21.5,
    textDecorationLine: 'underline',
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

export default HelpSupportScreen;
