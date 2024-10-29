import {getIndexOfStepForName} from '@features/flashing/utils';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {getDataFlashingDraft, getStep} from '@store/flashings/selectors';
import {Box} from '@ui/components';
import React from 'react';
import MeasurementLines from './MeasurementLines';
import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import {checkIsLandscape, isAndroid, isTablet} from '@shared/platform';
import {actions as flashingActions} from '@store/flashings/actions';
import {LINE_SELECTED} from '../Board/types';

type Props = {
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  updateAngle?: (newAngle: number, positionAngle: number) => void;
};

const Measurement: React.FC<Props> = ({onUpdatePoint, updateAngle}) => {
  const dispatch = useAppDispatch();

  const stepBoard = useAppSelector(state => getStep(state));
  const [typeSelected, setTypeSelected] = React.useState<'line' | 'angle'>(
    'line',
  );
  const isLandscape = checkIsLandscape();
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);
  const [indexLineSelected, setIndexLineSelected] = React.useState(0);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();

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

  const handleNextLineSelected = () => {
    if (!flashingDataDraft) return;
    const newIndex = indexLineSelected + 1;
    const lengthLine = flashingDataDraft.dataLines.length - 1;

    if (newIndex > lengthLine) {
      dispatch(
        flashingActions.changeStep({step: getIndexOfStepForName('end_type')}),
      );
    }

    if (newIndex > lengthLine) {
      setIndexLineSelected(lengthLine);
      setTypeSelected('line');
      return;
    }
    if (typeSelected === 'angle') {
      setIndexLineSelected(newIndex);
      setTypeSelected('line');
      return;
    }
    setTypeSelected('angle');
  };

  const handleBackLineSelected = () => {
    if (indexLineSelected === 0 && typeSelected === 'line') {
      return dispatch(
        flashingActions.changeStep({step: getIndexOfStepForName('side')}),
      );
    }

    const newIndex = indexLineSelected - 1;
    if (newIndex < 0) {
      setIndexLineSelected(0);
    }

    if (typeSelected === 'angle') {
      setTypeSelected('line');
      return;
    }

    if (typeSelected === 'line') {
      setTypeSelected('angle');
      setIndexLineSelected(newIndex);
    }
  };

  const handleDoneSize = (newSize: number, sizeType: 'line' | 'angle') => {
    if (!pointSelected) return;

    if (isNaN(newSize)) return;

    if (sizeType === 'angle') {
      updateAngle && updateAngle(newSize, indexLineSelected);
      return;
    }
    onUpdatePoint && onUpdatePoint({...pointSelected, sizeLine: newSize});
  };

  if (stepBoard !== getIndexOfStepForName('measurements')) {
    return null;
  }

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
      <MeasurementLines
        onNext={handleNextLineSelected}
        onPrevious={handleBackLineSelected}
        typeSelected={typeSelected}
        onDone={handleDoneSize}
        dataLine={pointSelected}
      />
    </Box>
  );
};

export default Measurement;
