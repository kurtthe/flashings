import React from 'react';
import PointerComponent from '@features/flashing/components/Pointer';
import Svg, { Path as PathComponent } from 'react-native-svg';
import { Path, serialize } from 'react-native-redash';
import { getIndexOfStepForName } from '@features/flashing/utils';
import { POINT_TYPE } from '@models';
import { getEndStartTypeLine } from '@features/flashing/components/SvgBoard/utils';
import {
  DREW_LINE_TYPE,
  heightScreen,
  SIZE_POINTER,
  widthScreen,
} from '@features/flashing/components/Board/types';
import GridComponent from '@features/flashing/components/Grid/Grid';
import TextSvgLineMM from '../TextSvgLineMM';
import { useAppSelector } from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getSideTapered,
  getStep,
} from '@store/flashings/selectors';
import { Text } from '@ui/components';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

type Props = {
  graphs: DREW_LINE_TYPE[];
  pathParallel: Path | null;
  pointsForLabel: null | POINT_TYPE[][];
  height?: number;
  width?: number;
};
const SvgBoard: React.FC<Props> = ({
  graphs = [],
  pathParallel,
  width = widthScreen,
  height = heightScreen,

  pointsForLabel,
}) => {
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const stepBoard = useAppSelector(state => getStep(state));
  const isFront = useSelector(getSideTapered);

  const isScreenShot = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('screen_shot');
  }, [stepBoard]);

  const isPreview = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('preview');
  }, [stepBoard]);

  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;

  const _removeGrid = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('screen_shot');
  }, [stepBoard]);

  const _isDraw = React.useMemo(() => {
    return stepBoard === getIndexOfStepForName('draw');
  }, [stepBoard]);

  const renderTypeEndStartLines = () => {
    if (graphs.length <= 0 || !graphs[0].isLine || !flashingDataDraft)
      return null;
    return getEndStartTypeLine({
      typeEnd: flashingDataDraft.endType,
      typeStart: flashingDataDraft.startType,
      lineStart: graphs[0],
      lineEnd: graphs.length < 2 ? graphs[0] : graphs[graphs.length - 1],
      isRightBlueLine: flashingDataDraft.parallelRight,
    });
  };

  return (
    <>
      <Svg width={width} height={height}>
        {!_removeGrid && <GridComponent />}
        {(isScreenShot || isPreview) && flashingDataDraft?.tapered && (
          <View
            style={{
              position: 'absolute',
              top: 15,
              width: '70%',
              left: '15%',
              padding: 15,
              backgroundColor: 'white',
              zIndex: 1,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 26,
                fontWeight: 'bold',
              }}>
              {isFront ? 'Front' : 'Back'}
            </Text>
          </View>
        )}
        {renderTypeEndStartLines()}
        {graphs.map(({ points, path: LineComponent, isLine }, index) => (
          <React.Fragment key={`graphs-${index}-${Math.random()}`}>
            {pathParallel && (
              <PathComponent
                d={serialize(pathParallel)}
                stroke={'#0056FF'}
                strokeDasharray={10}
                strokeWidth={1}
                fill="transparent"
              />
            )}
            {LineComponent}
            {pointsForLabel && (
              <>
                <TextSvgLineMM
                  coordinates={pointsForLabel[index]}
                  index={index}
                />
              </>
            )}

            {_isDraw && (
              <PointerComponent
                cx={points[0][0]}
                cy={points[0][1]}
                r={SIZE_POINTER}
                fill={colorPointer}
                strokeWidth={borderWidth}
                stroke={colorBorderPointer}
              />
            )}
            {isLine && (
              <>
                {graphs.length - 1 === index && !_isDraw ? null : (
                  <PointerComponent
                    cx={points[1][0]}
                    cy={points[1][1]}
                    r={_isDraw ? SIZE_POINTER : 0}
                    fill={colorPointer}
                    strokeWidth={borderWidth}
                    stroke={colorBorderPointer}
                  />
                )}
              </>
            )}
          </React.Fragment>
        ))}
      </Svg>
    </>
  );
};
export default React.memo(SvgBoard);
