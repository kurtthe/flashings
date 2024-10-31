import {CompleteEditMeasurementsIcon} from '@assets/icons';
import {getIndexOfStepForName} from '@features/flashing/utils';
import {useAppDispatch} from '@hooks/useStore';
import {isTablet} from '@shared/platform';
import {boardActions} from '@store/board';
import {SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme/index';
import {BaseTouchable, Box, Icon} from '@ui/components';
import React from 'react';

type Props = {
  onDone: () => void;
};

const IconButtonComplete: React.FC<Props> = ({onDone}) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      as={BaseTouchable}
      onPress={() => {
        onDone();
        dispatch(
          boardActions.changeStep({
            step: getIndexOfStepForName('end_type'),
          }),
        );
      }}
      position="absolute"
      bottom="105%"
      right="0%"
      backgroundColor="white"
      p={isTablet ? 's' : 'xs'}
      style={{
        zIndex: 1,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: 'lightGray',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      }}>
      <Icon
        as={CompleteEditMeasurementsIcon}
        color="black"
        size={isTablet ? SIZE_ICON_TABLET + 15 : SIZE_ICON_PHONE}
      />
    </Box>
  );
};

export default IconButtonComplete;
