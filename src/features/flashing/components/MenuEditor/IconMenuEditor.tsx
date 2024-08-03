import { BaseTouchable, Box, Icon, IconProps, Text } from '@ui/components';
import React from 'react';
import { isTablet } from '@shared/platform';
import { SIZE_ICON_PHONE, SIZE_ICON_TABLET } from '@theme';

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
    <Icon
      as={nameIcon}
      {...rest}
      color={disabled ? 'grayIcon' : 'black'}
      size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
    />
    {title && (
      <Text mt="xs" variant="menuEditor">
        {title}
      </Text>
    )}
  </Box>
);

export default IconMenuEditor;
