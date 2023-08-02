import React, {FC, useRef} from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TextStyle,
  TextInputProps as PropInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  input: {
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    height: 40,
    paddingHorizontal: 8
  },
  contentInput: {
    flexDirection: 'row',
    borderColor: '#8F94AE',
    borderWidth: 0.2,
    borderRadius: 8,
    padding: 6,
    backgroundColor: 'white',
  },
  labelInput: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 8,
    color: '#8F94AE'
  },
  icon: {
    marginRight: 4
  },
});

type TextInputProps = PropInput & {
  label?: string;
  placeholder?: string;
  onChangeText: (text?: string) => void;
  labelStyles?: TextStyle;
  inputStyles?: TextStyle;
  secureTextEntry?: boolean;
  nameIcon?: keyof typeof Ionicons;
  isMandatory?: boolean;
  noPadding?: boolean;
};

const Input: FC<TextInputProps> = ({
  label,
  onChangeText,
  inputStyles,
  labelStyles,
  placeholder,
  secureTextEntry = false,
  nameIcon,
  isMandatory,
  noPadding = false,
  ...props
}) => {
  const inputRef = useRef<TextInput>();

  return (
    <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
      <View style={styles.container}>
        {label && <Text style={[styles.labelInput, labelStyles]}>{label}{isMandatory ? <Text style={{color: 'red'}}>*</Text> : ''}</Text>}
        <View style={[styles.contentInput, noPadding && { padding: 0}]}>
          {nameIcon && (
            <Ionicons
              name={nameIcon}
              size={24}
              color={'blue'}
              style={styles.icon}
            />
          )}
          <TextInput
            secureTextEntry={secureTextEntry}
            ref={inputRef}
            style={[styles.input, inputStyles]}
            onChangeText={text => onChangeText(text)}
            placeholder={placeholder}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Input;
