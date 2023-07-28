import React from 'react';
import {StyleSheet} from 'react-native';
import {
  ClearIcon,
  EditIcon,
  LibraryIcon,
  NextIcon,
  UndoIcon,
} from '@assets/icons';
import {Box, Icon, IconButton, Text} from '@ui/components';

type Props = {
  onUndo?: () => void;
  onEdit?: () => void;
  onLibrary?: () => void;
  onEraser?: () => void;
  onNext?: () => void;
};

type IconMenuEditorProps = {
  nameIcon: any;
  onPress?: () => void;
  title?: string;
};

const IconMenuEditor: React.FC<IconMenuEditorProps> = ({
  title,
  nameIcon,
  onPress,
}) => (
  <Box>
    <IconButton
      onPress={() => onPress && onPress()}
      icon={<Icon as={nameIcon} />}
    />
    {title && (
      <Text mt="xs" variant="menuEditor">
        {title}
      </Text>
    )}
  </Box>
);

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
        <IconMenuEditor
          onPress={() => onUndo && onUndo()}
          nameIcon={UndoIcon}
          title="Undo"
        />

        <IconMenuEditor
          onPress={() => onEraser && onEraser()}
          nameIcon={ClearIcon}
          title="Clear"
        />
        <IconMenuEditor
          onPress={() => onEdit && onEdit()}
          nameIcon={EditIcon}
          title="Edit"
        />
        <IconMenuEditor
          onPress={() => onLibrary && onLibrary()}
          nameIcon={LibraryIcon}
          title="Library"
        />
        <IconMenuEditor
          onPress={() => onNext && onNext()}
          nameIcon={NextIcon}
          title="Next"
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
