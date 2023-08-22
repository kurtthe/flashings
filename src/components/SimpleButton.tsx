import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  underlined?: boolean;
  style?: ViewStyle;
};
const SimpleButton: React.FC<Props> = ({
  onPress,
  children,
  underlined = false,
  style = {},
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={style}>
        <Text
          style={[
            styles_btn_link.buttonText,
            underlined && { textDecorationLine: 'underline' },
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles_btn_link = StyleSheet.create({
  buttonText: {
    color: '#0E3A90',
    fontFamily: 'montserrat-bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SimpleButton;
