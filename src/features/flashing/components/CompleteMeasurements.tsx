import React from 'react';
import { BaseTouchable, Box, Icon } from '@ui/components';
import { CompleteEditMeasurementsIcon } from '@assets/icons';
import { isTablet } from '@shared/platform';
import { SIZE_ICON_PHONE, SIZE_ICON_TABLET } from '@theme';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

const CompleteMeasurements: React.FC<Props> = ({ onPress, children }) => {
  return (
    <Box height={380} position="absolute" width="100%" bottom={0}>
      <Box
        as={BaseTouchable}
        onPress={onPress}
        position="absolute"
        bottom="100%"
        right="0%"
        backgroundColor="white"
        p="xs"
        style={{
          zIndex: 1,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowColor: 'lightGray',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <Icon
          as={CompleteEditMeasurementsIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
        />
      </Box>
      {children}
    </Box>
  );
};

export default CompleteMeasurements;
