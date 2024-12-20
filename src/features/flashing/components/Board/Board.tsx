import React from 'react';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED,
  widthScreen,
} from './types';
import {findCoordsNearest} from '@features/flashing/components/Grid/Grid.utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import {
  drawLines,
  drawParallelLines,
  positionTextLabels,
} from '@features/flashing/components/Board/utils';
import {Path} from 'react-native-redash';
import SectionsButton from '@features/flashing/components/SectionsButton';
import {POINT_TYPE} from '@models';
import {isNaN} from 'lodash';
import {Box, ScrollBox} from '@ui/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getIndexOfStepForName} from '@features/flashing/utils';
import {checkIsLandscape, isAndroid, isTablet} from '@shared/platform';
import {useKeyboardVisibility} from '@hooks/useKeyboardVisibility';
import EndTypesLineComponent from '@features/flashing/components/EndTypesLine';
import SvgBoard from '@features/flashing/components/SvgBoard/SvgBoard';
import TaperedLines from '@features/flashing/components/TaperedLines';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getIsEdit,
  getSideTapered,
  getStep,
} from '@store/flashings/selectors';
import {actions as flashingActions} from '@store/flashings/actions';
import CompleteMeasurements from '@features/flashing/components/CompleteMeasurements';
import {getGirth} from '@shared/utils/JobOrders';
import {config} from '@env/config';
import Toast from 'react-native-toast-message';

type Props = {
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: () => void;
  width?: number;
  height?: number;
  updateAngle?: (newAngle: number, positionAngle: number) => void;
};

const Board: React.FC<Props> = ({
  onUpdatePoint,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  onSave,
  updateAngle,
}) => {
  const dispatch = useAppDispatch();
  const isFront = useAppSelector(getSideTapered);
  const isEdit = useAppSelector(getIsEdit);
  const stepBoard = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const isLandscape = checkIsLandscape();

  const [graphs, setGraphs] = React.useState<DREW_LINE_TYPE[]>([]);
  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [pathParallel, setPathParallel] = React.useState<Path | null>(null);
  const [pointsForLabel, setPointsForLabel] = React.useState<
    null | POINT_TYPE[][]
  >(null);

  const [indexLineSelected, setIndexLineSelected] = React.useState(0);
  const [typeSelected, setTypeSelected] = React.useState<'line' | 'angle'>(
    'line',
  );
  const [heightMeasurement, setHeightMeasurement] = React.useState(200);

  useKeyboardVisibility({
    onKeyboardDidShow: (heightKeyboard: number = 357) => {
      setHeightMeasurement(heightKeyboard);
    },
    onKeyboardDidHide: () => setHeightMeasurement(200),
  });

  const isDrawing = stepBoard === getIndexOfStepForName('draw');

  React.useEffect(() => {
    if (!flashingDataDraft) return;
    const makingLines = drawLines({
      lines: flashingDataDraft.dataLines,
      widthGraph: width,
      heightGraph: height,
      rightLinePaint: flashingDataDraft.parallelRight,
      lineSelected: indexLineSelected,
      typeSelected,
      anglesLines: flashingDataDraft.angles,
    });
    setPathParallel(
      drawParallelLines(
        flashingDataDraft.dataLines,
        flashingDataDraft.parallelRight,
      ),
    );
    setPointsForLabel(
      positionTextLabels(
        flashingDataDraft.dataLines,
        !flashingDataDraft.parallelRight,
      ),
    );
    setGraphs(makingLines);
  }, [flashingDataDraft, indexLineSelected]);

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
  }, [stepBoard, indexLineSelected, graphs, isFront]);

  const handleDoneSize = (newSize: number, sizeType: 'line' | 'angle') => {
    if (!pointSelected || !flashingDataDraft) return;

    const getHowManyGirth = getGirth(flashingDataDraft);
    if (getHowManyGirth >= config.maxGirth) {
      Toast.show({
        position: 'bottom',
        text1: `Girth must not exceed ${config.maxGirth}${config.unitMeasurement}`,
        type: 'info',
      });
      return;
    }

    if (isNaN(newSize)) return;

    if (sizeType === 'angle') {
      updateAngle && updateAngle(newSize, indexLineSelected);
      return;
    }
    onUpdatePoint && onUpdatePoint({...pointSelected, sizeLine: newSize});
  };

  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;

    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint && onAddPoint([newPosition.x, newPosition.y]);
  };

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

  const handleOnSave = () => {
    dispatch(
      flashingActions.changeStep({
        step: getIndexOfStepForName('screen_shot'),
      }),
    );
    onSave && onSave();
  };

  const handleOnEdit = () => {
    dispatch(
      flashingActions.changeStep({
        step: getIndexOfStepForName('measurements'),
      }),
    );
    setIndexLineSelected(0);
  };

  const handleOnEditEndType = () => {
    dispatch(
      flashingActions.changeStep({step: getIndexOfStepForName('end_type')}),
    );
  };

  const handleOnTapered = () => {
    if (!flashingDataDraft) return;
    setIndexLineSelected(0);
    setTypeSelected('line');

    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          tapered: {
            front: flashingDataDraft.dataLines,
            back: flashingDataDraft.dataLines,
            frontImagePreview: undefined,
            backImagePreview: undefined,
          },
        },
      }),
    );
    dispatch(
      flashingActions.changeStep({step: getIndexOfStepForName('tapered')}),
    );
  };

  return (
    <>
      <ScrollBox
        as={KeyboardAwareScrollView}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
          <GestureHandlerRootView>
            <SvgBoard
              height={heightScreen}
              graphs={graphs}
              pathParallel={pathParallel}
              pointsForLabel={pointsForLabel}
            />
          </GestureHandlerRootView>
        </TouchableOpacity>
      </ScrollBox>

      {stepBoard === getIndexOfStepForName('finish') && (
        <SectionsButton
          onTapered={handleOnTapered}
          onSave={handleOnSave}
          onEdit={handleOnEdit}
          onEditEndType={handleOnEditEndType}
        />
      )}

      {stepBoard === getIndexOfStepForName('measurements') && (
        <Box
          height={heightMeasurement}
          position="absolute"
          backgroundColor="white"
          width="100%"
          bottom={0}>
          <MeasurementLines
            onNext={handleNextLineSelected}
            onPrevious={handleBackLineSelected}
            typeSelected={typeSelected}
            onDone={handleDoneSize}
            dataLine={pointSelected}
          />
        </Box>
      )}

      {stepBoard === getIndexOfStepForName('tapered') && (
        <Box
          height={heightMeasurement}
          backgroundColor="white"
          position="absolute"
          width="100%"
          bottom={0}>
          <TaperedLines onChangeIndexSelected={setIndexLineSelected} />
        </Box>
      )}

      {stepBoard === getIndexOfStepForName('save_tapered') && (
        <SectionsButton onSave={handleOnSave} />
      )}

      {stepBoard === getIndexOfStepForName('end_type') && (
        <CompleteMeasurements
          onPress={() => {
            if (isEdit && !!flashingDataDraft?.tapered) {
              dispatch(
                flashingActions.changeStep({
                  step: getIndexOfStepForName('tapered'),
                }),
              );
            } else {
              dispatch(
                flashingActions.changeStep({
                  step: getIndexOfStepForName('finish'),
                }),
              );
            }
          }}>
          <EndTypesLineComponent />
        </CompleteMeasurements>
      )}
    </>
  );
};

export default React.memo(Board);
