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

import {
  drawLines,
  drawParallelLines,
  positionTextLabels,
} from '@features/flashing/components/Board/utils';
import {Path} from 'react-native-redash';
import {SectionsButton} from '@features/flashing/components/SectionsButton';
import {POINT_TYPE} from '@models';
import {ScrollBox} from '@ui/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getIndexOfStepForName} from '@features/flashing/utils';
import EndTypesLineComponent from '@features/flashing/components/EndTypesLine';
import SvgBoard from '@features/flashing/components/SvgBoard/SvgBoard';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getIsEdit,
  getSideTapered,
  getStep,
} from '@store/flashings/selectors';
import {actions as flashingActions} from '@store/flashings/actions';
import CompleteMeasurements from '@features/flashing/components/Measurement/CompleteMeasurements';
import Measurement from '../Measurement/Measurement';
import {Tapered} from '../Tapered';

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

  const handlePointer = (event: GestureResponderEvent) => {
    if (!isDrawing) return;

    const newPosition = findCoordsNearest([
      event.nativeEvent.locationX,
      event.nativeEvent.locationY,
    ]);

    onAddPoint && onAddPoint([newPosition.x, newPosition.y]);
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

      <Measurement />
      <SectionsButton onSave={onSave} />
      <Tapered setIndexLineSelected={setIndexLineSelected} />

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
