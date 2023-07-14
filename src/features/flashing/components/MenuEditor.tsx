import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ClearIcon,
  EditIcon,
  LibraryIcon,
  NextIcon,
  UndoIcon,
} from '@assets/icons';
import {Box, Icon, IconButton} from '@ui/components';
type Props = {
  onUndo?: () => void;
  onEdit?: () => void;
  onLibrary?: () => void;
  onEraser?: () => void;
  onNext?: () => void;
};
const MenuEditorComponent: React.FC<Props> = ({
  onNext,
  onLibrary,
  onEdit,
  onUndo,
  onEraser,
}) => {
  return (
    <Box
      py="l"
      mb="xl"
      backgroundColor="white"
      position="absolute"
      width="100%"
      bottom="-4%"
      style={styles.shadow}>
      <Box px="m" style={styles.content}>
        <IconButton
          onPress={() => onUndo && onUndo()}
          icon={<Icon as={UndoIcon} />}
        />
        <IconButton
          onPress={() => onEraser && onEraser()}
          icon={<Icon as={ClearIcon} />}
        />
        <IconButton
          onPress={() => onEdit && onEdit()}
          icon={<Icon as={EditIcon} />}
        />
        <IconButton
          onPress={() => onLibrary && onLibrary()}
          icon={<Icon as={LibraryIcon} />}
        />
        <IconButton
          onPress={() => onNext && onNext()}
          icon={<Icon as={NextIcon} />}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: -4,
    },
    elevation: 16,
    shadowRadius: 10,
    shadowColor: 'rgba(47, 51, 80, 0.12)',
    shadowOpacity: 1,
  },
});

export default MenuEditorComponent;
