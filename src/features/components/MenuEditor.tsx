import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ClearIcon, NextIcon} from '@assets/icons';
import {Icon, IconButton} from '@ui/components';
type Props = {
  onEraser?: () => void;
  onNext?: () => void;
};
const MenuEditorComponent: React.FC<Props> = ({onEraser, onNext}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IconButton
          onPress={() => onEraser && onEraser()}
          icon={<Icon as={ClearIcon} />}
        />

        <IconButton
          onPress={() => onNext && onNext()}
          icon={<Icon as={NextIcon} />}
        />
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

export default MenuEditorComponent;
