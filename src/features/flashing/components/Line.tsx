import React from 'react';
import { BUILD_LINE, LETTER_LINES } from '@features/flashing/components/Board';
import {
  buildPathLine,
  calculateParallelLine,
  calculatePositionText,
} from '@features/flashing/utils';
import { G, Path as PathComponent, Rect, Text } from 'react-native-svg';

type Props = BUILD_LINE;
const LineMadeComponent: React.FC<Props> = ({
  line,
  onPressLine,
  isDrawing,
  id,
  rightLinePaint,
}) => {
  const [textWidth, setTextWidth] = React.useState(30);
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePositionText(line);
  const pointsParallel = calculateParallelLine(line, rightLinePaint);

  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        onPress={() => onPressLine(id)}
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={1}
        stroke="#000"
      />
      <PathComponent
        onPress={() => onPressLine(id)}
        key={`parallelLine${id}`}
        d={buildPathLine(pointsParallel)}
        strokeWidth={1}
        stroke="#0056FF"
      />
      {!isDrawing && line.distance ? (
        <>
          <Rect
            width={textWidth}
            height="17"
            origin={`${positionText[0]}, ${positionText[1]}`}
            fill="#fff"
            y={positionText[1] - 14}
            x={positionText[0] - 28}
            rx={0}
            ry={0}
          />
          <Text
            onLayout={event => {
              setTextWidth(event.nativeEvent.layout.width + 10);
            }}
            onPress={() => onPressLine(id)}
            key={`backgroundSizeText${id}`}
            textAnchor="middle"
            fill="#000"
            y={positionText[1]}
            x={positionText[0] - 3}
            fontSize={14}>
            {`${line.distance}in`}
          </Text>
        </>
      ) : null}
      <>
        <Rect
          width="17"
          height="25"
          origin={`${positionText[0]}, ${positionText[1]}`}
          fill="#fff"
          y={positionText[1] - 50}
          x={positionText[0] - 9}
          rx={0}
          ry={0}
        />
        <Text
          key={`nameLine${id}`}
          textAnchor="middle"
          fill={colorLabel}
          fontSize={fontSize}
          x={positionText[0]}
          y={positionText[1] - 30}>
          {LETTER_LINES[id]}
        </Text>
      </>
    </G>
  );
};

export default LineMadeComponent;
