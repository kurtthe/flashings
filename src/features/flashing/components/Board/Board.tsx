import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import {
  DREW_LINE_TYPE,
  heightScreen,
  LINE_SELECTED,
  STEPS_BOARD,
  widthScreen,
} from './types';
import { findCoordsNearest } from '@features/flashing/components/Grid/Grid.utils';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalBottomRef } from '@components';
import MeasurementLines from '@features/flashing/components/MeasurementLines';
import {
  drawLines,
  drawParallelLines,
  positionTextLabels,
} from '@features/flashing/components/Board/utils';
import { Path } from 'react-native-redash';
import SectionsButton from '@features/flashing/components/SectionsButton';
import { LINE_TYPE, POINT_TYPE, TYPE_END_LINES } from '@models';
import { isNaN } from 'lodash';
import {
  BaseTouchable,
  Box,
  Icon,
  KeyboardAvoidingBox,
  ScrollBox,
} from '@ui/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getIndexOfStepForName } from '@features/flashing/utils';
import { CompleteEditMeasurementsIcon } from '@assets/icons';
import { isAndroid } from '@shared/platform';
import { useKeyboardVisibility } from '@hooks/useKeyboardVisibility';
import EndTypesLineComponent from '@features/flashing/components/EndTypesLine';
import SvgBoard from '@features/flashing/components/SvgBoard/SvgBoard';
import TaperedLines from '@features/flashing/components/TaperedLines';

type Props = {
  lines: LINE_TYPE[];
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: (redirect?: boolean) => void;
  width?: number;
  height?: number;
  changeStepBoard?: (newStep: number) => void;
  stepBoard: number;
  rightLinePaint: boolean;
  angles?: number[];
  updateAngle?: (newAngle: number, positionAngle: number) => void;
  startTypeLine?: TYPE_END_LINES;
  endTypeLine?: TYPE_END_LINES;
  changeStartTypeLine?: (newType: TYPE_END_LINES) => void;
  changeEndTypeLine?: (newType: TYPE_END_LINES) => void;
  idFlashingToCreate?: number;
  jobId?: number;
};

const Board: React.FC<Props> = ({
  lines,
  onUpdatePoint,
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  stepBoard = 0,
  changeStepBoard,
  rightLinePaint,
  onSave,
  angles = [],
  idFlashingToCreate,
  jobId,
  updateAngle,
  changeStartTypeLine,
  changeEndTypeLine,
  startTypeLine = 'none',
  endTypeLine = 'none',
}) => {
  const modalBottomRef = React.useRef<ModalBottomRef>();
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
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);

  useKeyboardVisibility({
    onKeyboardDidShow: () => setHeightMeasurement(isAndroid ? 70 : 350),
    onKeyboardDidHide: () => setHeightMeasurement(200),
  });

  const isDrawing = STEPS_BOARD[stepBoard] === 'draw';

  React.useEffect(() => {
    const makingLines = drawLines({
      lines,
      widthGraph: width,
      heightGraph: height,
      step: stepBoard,
      rightLinePaint,
      lineSelected: indexLineSelected,
      typeSelected,
      anglesLines: angles,
    });
    setPathParallel(drawParallelLines(lines, rightLinePaint));
    setPointsForLabel(positionTextLabels(lines, !rightLinePaint));
    setGraphs(makingLines);
  }, [
    lines,
    stepBoard,
    rightLinePaint,
    indexLineSelected,
    typeSelected,
    angles,
  ]);

  React.useEffect(() => {
    if (STEPS_BOARD[stepBoard] === 'finish') {
      modalBottomRef.current?.hide();
    }
    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: lines[indexLineSelected]?.distance ?? 0,
      angle: angles[indexLineSelected],
    });
    modalBottomRef.current?.show();
  }, [stepBoard, indexLineSelected, graphs]);

  const handleDoneSize = (newSize: number, sizeType: 'line' | 'angle') => {
    if (!pointSelected) return;

    if (isNaN(newSize)) return;

    if (sizeType === 'angle') {
      updateAngle && updateAngle(newSize, indexLineSelected);
      return;
    }
    onUpdatePoint && onUpdatePoint({ ...pointSelected, sizeLine: newSize });
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
    const newIndex = indexLineSelected + 1;
    const lengthLine = lines.length - 1;

    if (newIndex > lengthLine) {
      return (
        changeStepBoard && changeStepBoard(getIndexOfStepForName('end_type'))
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
      return changeStepBoard && changeStepBoard(getIndexOfStepForName('side'));
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

  const handleOnSave = (redirect = true) => {
    changeStepBoard && changeStepBoard(getIndexOfStepForName('screen_shot'));
    onSave?.(redirect);
  };
  const handleOnEdit = () => {
    changeStepBoard && changeStepBoard(getIndexOfStepForName('measurements'));
    setIndexLineSelected(0);
  };
  const handleOnEditEndType = () => {
    changeStepBoard && changeStepBoard(getIndexOfStepForName('end_type'));
  };

  const handleOnTapered = () => {
    handleOnSave(false);
    changeStepBoard && changeStepBoard(getIndexOfStepForName('tapered'));
  };

  return (
    <>
      <ScrollBox
        as={KeyboardAwareScrollView}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingBox>
          <TouchableOpacity activeOpacity={1} onPress={handlePointer}>
            <GestureHandlerRootView>
              <SvgBoard
                removeGrid={
                  stepBoard === getIndexOfStepForName('screen_shot') ||
                  stepBoard === getIndexOfStepForName('tapered')
                }
                isRight={rightLinePaint}
                typeEndLine={endTypeLine}
                typeStartLine={startTypeLine}
                step={stepBoard}
                height={heightScreen}
                graphs={graphs}
                pathParallel={pathParallel}
                pointsForLabel={pointsForLabel}
              />
            </GestureHandlerRootView>
          </TouchableOpacity>
        </KeyboardAvoidingBox>
      </ScrollBox>
      {stepBoard === getIndexOfStepForName('finish') && (
        <SectionsButton
          onTapered={handleOnTapered}
          disabledTapered={!jobId || !idFlashingToCreate}
          onSave={handleOnSave}
          onEdit={handleOnEdit}
          onEditEndType={handleOnEditEndType}
        />
      )}
      {stepBoard === getIndexOfStepForName('measurements') && (
        <Box
          height={heightMeasurement}
          position="absolute"
          width="100%"
          bottom={0}>
          <MeasurementLines
            onNext={handleNextLineSelected}
            onPrevious={handleBackLineSelected}
            typeSelected={typeSelected}
            onDone={handleDoneSize}
            dataLine={pointSelected}
            changeMode={changeStepBoard}
          />
        </Box>
      )}

      {stepBoard === getIndexOfStepForName('tapered') && (
        <Box
          height={heightMeasurement}
          position="absolute"
          width="100%"
          bottom={0}>
          <TaperedLines idFlashingToCreate={idFlashingToCreate} jobId={jobId} />
        </Box>
      )}

      {stepBoard === getIndexOfStepForName('end_type') && (
        <Box height={380} position="absolute" width="100%" bottom={0}>
          <Box
            as={BaseTouchable}
            onPress={() => {
              changeStepBoard &&
                changeStepBoard(getIndexOfStepForName('finish'));
            }}
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
            <Icon as={CompleteEditMeasurementsIcon} color="black" size={35} />
          </Box>

          <EndTypesLineComponent
            changeStartTypeLine={changeStartTypeLine}
            changeEndTypeLine={changeEndTypeLine}
            startTypeLine={startTypeLine}
            endTypeLine={endTypeLine}
          />
        </Box>
      )}
    </>
  );
};

export default React.memo(Board);
