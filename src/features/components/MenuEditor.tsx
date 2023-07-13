import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {ClearIcon, NextIcon} from '@assets/icons';
type Props = {
  onEraser?: () => void;
  onNext?: () => void;
};
const MenuEditor: React.FC<Props> = ({onEraser, onNext}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => onEraser && onEraser()}>
          <ClearIcon />
        </Pressable>

        <Pressable onPress={() => onNext && onNext()}>
          <NextIcon />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#CCCCCC',
    height: '10%',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MenuEditor;
