import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BackIcon,
  ClearIcon,
  LibraryIcon,
  NextIcon,
  UndoIcon
} from "@assets/icons";
import { Box, Icon, IconButton, IconProps, Text } from "@ui/components";

type Props = {
  onUndo?: () => void;
  onBack?: () => void;
  onLibrary?: () => void;
  onEraser?: () => void;
  onNext?: () => void;
};

type IconMenuEditorProps = IconProps &{
  nameIcon: any;
  onPress?: () => void;
  title?: string;
};

const IconMenuEditor: React.FC<IconMenuEditorProps> = ({
  title,
  nameIcon,
  onPress,
  ...rest
}) => (
  <Box alignItems="center" justifyContent="center">
    <IconButton
      onPress={() => onPress && onPress()}
      icon={<Icon as={nameIcon} {...rest} />}
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
  onBack,
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
          onPress={() => onBack && onBack()}
          nameIcon={BackIcon}
          title="Back"
          color="black"
          size={20}
        />
        <IconMenuEditor
          onPress={() => onUndo && onUndo()}
          nameIcon={UndoIcon}
          title="Undo"
        />
        <IconMenuEditor
          onPress={() => onEraser && onEraser()}
          nameIcon={ClearIcon}
          title="Clear"
          size={22}
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
