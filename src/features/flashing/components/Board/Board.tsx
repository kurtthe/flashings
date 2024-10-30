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
import {useBoard} from '@hooks/board/useBoard';

type Props = {
  onAddPoint?: (newPoint: POINT_TYPE) => void;
  onUpdatePoint?: (dataLine: LINE_SELECTED) => void;
  onSave?: () => void;
  width?: number;
  height?: number;
  updateAngle?: (newAngle: number, positionAngle: number) => void;
};

const Board: React.FC<Props> = ({
  onAddPoint,
  width = widthScreen,
  height = heightScreen,
  onSave,
}) => {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(getIsEdit);
  const stepBoard = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const {pathParallel, graphs, pointsForLabel} = useBoard({
    width,
    height,
  });

  const [indexLineSelected, setIndexLineSelected] = React.useState(0);
  const isDrawing = stepBoard === getIndexOfStepForName('draw');

  React.useEffect(() => {
    if (!flashingDataDraft) return;
  }, [flashingDataDraft, indexLineSelected]);

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
