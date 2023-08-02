import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const ForgotButton = props => {
  return (
    <TouchableWithoutFeedback activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles_btn_link.button}>
        <Text style={styles_btn_link.buttonText}>{props.children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles_btn_link = StyleSheet.create({
  button: {
    top:0,
    paddingTop:10, 
  },
  buttonText: {
    color: '#8F94AE',
    fontFamily: 'montserrat-regular',
    fontSize: 15,
    textAlign: 'center',
  }
});

export default ForgotButton;
