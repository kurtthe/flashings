import {getIndexOfStepForName} from '@features/flashing/utils';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';

import {Box} from '@ui/components';
import React from 'react';
import MeasurementLines from './MeasurementLines';
import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import {checkIsLandscape, isAndroid, isTablet} from '@shared/platform';
import {LINE_SELECTED} from '../Board/types';
import {
  getBoardFlashingData,
  getIndexLineSelected,
  getSideTapered,
  getStep,
  getTypeSelected,
} from '@store/board/selectors';
import {boardActions} from '@store/board';

const Measurement = () => {
  const dispatch = useAppDispatch();
  const isFront = useAppSelector(getSideTapered);

  const indexLineSelected = useAppSelector(getIndexLineSelected);
  const stepBoard = useAppSelector(getStep);
  const typeSelected = useAppSelector(getTypeSelected);

  const isLandscape = checkIsLandscape();
  const flashingDataDraft = useAppSelector(state =>
    getBoardFlashingData(state),
  );
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);

  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();

  const isLine = React.useMemo(() => {
    return typeSelected === 'line';
  }, [typeSelected]);

  React.useEffect(() => {
    if (!flashingDataDraft) return;

    if (flashingDataDraft.tapered) {
      setPointSelected({
        numberLine: indexLineSelected,
        sizeLine:
          flashingDataDraft.tapered[isFront ? 'front' : 'back'][
            indexLineSelected
          ]?.distance,
        angle: flashingDataDraft.angles[indexLineSelected],
      });
      return;
    }

    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: flashingDataDraft.dataLines[indexLineSelected]?.distance ?? 0,
      angle: flashingDataDraft.angles[indexLineSelected],
    });
  }, [stepBoard, indexLineSelected, isFront]);

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
        boardActions.changeStep({step: getIndexOfStepForName('end_type')}),
      );
    }

    if (newIndex > lengthLine) {
      dispatch(boardActions.changeIndexLineSelected({newIndex: lengthLine}));
      dispatch(boardActions.changeTypeSelected({newTypeSelected: 'line'}));
      return;
    }
    if (!isLine) {
      dispatch(boardActions.changeIndexLineSelected({newIndex: lengthLine}));
      dispatch(boardActions.changeTypeSelected({newTypeSelected: 'line'}));
      return;
    }
    dispatch(boardActions.changeTypeSelected({newTypeSelected: 'angle'}));
  };

  const handleBackLineSelected = React.useCallback(() => {
    if (indexLineSelected === 0 && isLine) {
      return dispatch(
        boardActions.changeStep({step: getIndexOfStepForName('side')}),
      );
    }

    const newIndex = indexLineSelected - 1;
    if (newIndex < 0) {
      dispatch(boardActions.changeIndexLineSelected({newIndex}));
    }

    if (!isLine) {
      dispatch(boardActions.changeTypeSelected({newTypeSelected: 'line'}));
      return;
    }

    dispatch(boardActions.changeTypeSelected({newTypeSelected: 'angle'}));
    dispatch(boardActions.changeIndexLineSelected({newIndex}));
  }, [indexLineSelected, typeSelected]);

  const handleDoneSize = (newSize: number) => {
    if (!pointSelected) return;

    if (isNaN(newSize)) return;

    if (!isLine) {
      dispatch(
        boardActions.updateAngles({
          newAngle: newSize,
          positionAngle: indexLineSelected,
        }),
      );
      return;
    }

    dispatch(
      boardActions.updatePoint({
        dataLine: {...pointSelected, sizeLine: newSize},
      }),
    );
  };

  if (stepBoard !== getIndexOfStepForName('measurements')) {
    return null;
  }

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
      <MeasurementLines
        onNext={handleNextLineSelected}
        onPrevious={handleBackLineSelected}
        onDone={handleDoneSize}
        dataLine={pointSelected}
      />
    </Box>
  );
};

export default Measurement;
