import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  Alert,
  View,
} from 'react-native';
import { Text, Button, Box, KeyboardAvoidingBox } from "@ui/components";
import DismissKeyboardPressable from "@components/forms/DismissKeyboardPressable";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get('screen');
import { formatPhone } from "@shared/helpers";
const HelpSupportScreen = () => {
  const navigation = useNavigation()
  const numberPhone = "0399993333"
  const emailAddress = "help@burdens.com.au"

  return (
    <KeyboardAvoidingBox flex={1}>
      <DismissKeyboardPressable>
        <View style={styles.container}>
          <View style={styles.logoAndMainTextContainer}>
            <Image
              style={styles.mainLogo}
              source={require('@assets/logo/MainLogo.png')}
            />
            <Text style={styles.mainTextStyle}>Help Support</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={[styles.infoTextStyle, { paddingBottom: 25 }]}>
              This app is only for Burbend Trade Costumers.{'\n'}
              {'\n'}
              If you need help to get access to your trade account or open one,
              Please contact us on:
            </Text>
            <View style={{ paddingBottom: 32 }}>
              <Text style={[styles.infoTextStyle, { paddingBottom: 5 }]}>
                Email
              </Text>
              <Text onPress={()=> Linking.openURL(`mailto:${emailAddress}`)}  style={styles.underlinedTextStyle}>
                {emailAddress}
              </Text>
            </View>
            <View>
              <Text  style={[styles.infoTextStyle, { paddingBottom: 5 }]}>
                Phone number
              </Text>
              <Text onPress={()=> Linking.openURL(`tel:${numberPhone}`)} style={styles.underlinedTextStyle}>{formatPhone(numberPhone, {format: "NATIONAL"})}</Text>
            </View>
          </View>
          <Box flex={2} style={{ justifyContent: 'flex-end' }}>
            <Button variant="solid" onPress={() => navigation.goBack()}>
              Back
            </Button>
          </Box>
        </View>
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
  logoAndMainTextContainer: {
    flex: 1.2,
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
  underlinedTextStyle: {
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
    width: 142,
    height: 74,
    resizeMode: 'contain',
  },
});

export default HelpSupportScreen;
