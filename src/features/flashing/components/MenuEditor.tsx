import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BackIcon,
  ClearIcon,
  LibraryIcon,
  NextIcon,
  UndoIcon,
} from '@assets/icons';
import { BaseTouchable, Box, Icon, IconProps, Text } from '@ui/components';

type Props = {
  onUndo?: () => void;
  onBack?: () => void;
  onLibrary?: () => void;
  onEraser?: () => void;
  onNext?: () => void;
  disabledBack?: boolean;
  disabledUndo?: boolean;
  disabledEraser?: boolean;
  disabledLibrary?: boolean;
  disabledNext?: boolean;
};

type IconMenuEditorProps = IconProps & {
  nameIcon: any;
  onPress?: () => void;
  title?: string;
};

const IconMenuEditor: React.FC<IconMenuEditorProps> = ({
  title,
  nameIcon,
  onPress,
  disabled = true,
  ...rest
}) => (
  <Box
    disabled={disabled}
    p="m"
    as={BaseTouchable}
    alignItems="center"
    justifyContent="center"
    onPress={() => onPress && !disabled && onPress()}>
    <Icon as={nameIcon} {...rest} color={disabled ? 'grayIcon' : 'black'} />
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
  onBack,
  onUndo,
  onEraser,
  disabledBack = true,
  disabledUndo = true,
  disabledEraser = true,
  disabledLibrary = false,
  disabledNext = false,
}) => {
  return (
    <Box
      py="s"
      mb="xl"
      backgroundColor="white"
      position="absolute"
      width="100%"
      bottom="-4%"
      style={styles.shadow}>
      <Box px="m" style={styles.content}>
        <IconMenuEditor
          disabled={disabledBack}
          onPress={() => onBack && onBack()}
          nameIcon={BackIcon}
          title="Back"
          color="black"
          size={20}
        />
        <IconMenuEditor
          disabled={disabledUndo}
          onPress={() => onUndo && onUndo()}
          nameIcon={UndoIcon}
          title="Undo"
        />
        <IconMenuEditor
          onPress={() => onEraser && onEraser()}
          disabled={disabledEraser}
          nameIcon={ClearIcon}
          title="Clear"
          size={22}
        />
        <IconMenuEditor
          disabled={disabledLibrary}
          onPress={() => onLibrary && onLibrary()}
          nameIcon={LibraryIcon}
          title="Library"
        />
        <IconMenuEditor
          disabled={disabledNext}
          onPress={() => onNext && onNext()}
          nameIcon={NextIcon}
          title="Next"
          size={22}
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
