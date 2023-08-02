import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const SimpleButton = props => {
  return (
    <TouchableWithoutFeedback activeOpacity={0.6} onPress={props.onPress}>
      <View style={props.style}>
        <Text style={[styles_btn_link.buttonText, props.underlined && {textDecorationLine: 'underline'}]}>{props.children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles_btn_link = StyleSheet.create({

  buttonText: {
    color: '#0E3A90',
    fontFamily: 'montserrat-bold',
    fontSize: 15,
    textAlign: 'center'
  }
});

export default SimpleButton;
