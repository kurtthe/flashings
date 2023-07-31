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
  const LearnHowToOpenScreen = ({navigation}) => {
    const navigateTo = (routeToGo) =>{navigation.navigate(routeToGo)}

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <DismissKeyboard>
          <View style={styles.container}>
            <View style={styles.socialConnect}>
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
                Want to access the Burdens Flashing Designer? You'll need to open a Burdens Trade account to get in.
              </Text>
            </View>
            <View style={{flex: 2}}>
              <Text
                style={[styles.infoTextStyle, {paddingBottom: 25}]}
              >
                To access the Flashing Designer, please us contact via:
              </Text>
              <View>
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
                    03 9703 8400
                  </Text>
                </View>
              </View>
            </View>
            <Box
              flex={1} style={{ justifyContent: 'space-around'}}
            >
              <Button
                variant="solid"
                onPress={() => navigateTo(Routes.LOGIN)}
              >
                Back to Login
              </Button>
              <View>
                <SimpleButton underlined onPress={() => navigateTo(Routes.HELP_SUPPORT)}>
                  Need Help?
                </SimpleButton>
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
  socialConnect: {
    flex: 1,
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

export default LearnHowToOpenScreen;
