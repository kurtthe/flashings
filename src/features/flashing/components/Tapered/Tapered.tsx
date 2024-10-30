import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import React from 'react';
import {checkIsLandscape, isAndroid, isTablet} from '@shared/platform';
import {getIndexOfStepForName} from '@features/flashing/utils';
import {useAppSelector} from '@hooks/useStore';
import {Box} from '@ui/components';
import TaperedLines from './TaperedLines';
import {getStep} from '@store/board/selectors';

type Props = {
  setIndexLineSelected: (newValue: number) => void;
};

const Tapered: React.FC<Props> = ({setIndexLineSelected}) => {
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);
  const isLandscape = checkIsLandscape();
  const stepBoard = useAppSelector(state => getStep(state));

  useKeyboardVisibility({
    onKeyboardDidShow: () => {
      let heightForKeyboard = 350;
      if (isAndroid) {
        heightForKeyboard = isTablet ? 80 : 70;
      }
      if (isTablet) {
        heightForKeyboard = 470;
      }

      if (isLandscape) {
        heightForKeyboard = 565;
      }

      setHeightMeasurement(heightForKeyboard);
    },
    onKeyboardDidHide: () => setHeightMeasurement(200),
  });

  if (stepBoard !== getIndexOfStepForName('tapered')) {
    return null;
  }

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
      <TaperedLines onChangeIndexSelected={setIndexLineSelected} />
    </Box>
  );
};

export default Tapered;
