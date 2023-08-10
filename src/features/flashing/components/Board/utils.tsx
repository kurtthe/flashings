import {
  BUILD_LINE,
  DREW_LINE_TYPE,
  LETTER_LINES,
  LINE_TYPE,
  MAKE_LINE,
} from './types';
import * as shape from 'd3-shape';
import { parse, serialize } from 'react-native-redash';
import React from 'react';
import { G, Path as PathComponent, Rect, Text } from 'react-native-svg';
import {
  calculateParallelLine,
  calculatePositionText,
} from '@features/flashing/utils';

export const drawLines = ({
  lines,
  onPressLine,
  isDrawing = true,
}: MAKE_LINE & {
  widthGraph: number;
  heightGraph: number;
}): DREW_LINE_TYPE[] => {
  if (lines.length < 1) return [];

  return lines.map((line, index) => ({
    ...line,
    path:
      line.points.length === 2
        ? buildLine({
            id: index,
            line,
            onPressLine,
            isDrawing,
          })
        : undefined,
  }));
};

const buildPathLine = (points: LINE_TYPE['points']) => {
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);
  return serialize(parse(generatorLine(points) as string));
};

const buildLine = ({ line, onPressLine, isDrawing, id }: BUILD_LINE) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionTextSizeLine = calculatePositionText(line);
  const positionText = calculatePositionText(line, 1);
  const pointsParallel = calculateParallelLine(line);
  console.log('line points::', line.points);
  console.log('pointsParallel::', pointsParallel);
  return (
    <G key={`groupPath${id}`}>
      {!isDrawing && (
        <Text
          key={`nameLine${id}`}
          textAnchor="middle"
          fill={colorLabel}
          fontSize={fontSize}
          x={positionText[0]}
          y={positionText[1]}>
          {LETTER_LINES[id]}
        </Text>
      )}

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
      {!isDrawing && line.distance && (
        <>
          <Rect
            width="40"
            height="17"
            origin={`${positionTextSizeLine[0]}, ${positionTextSizeLine[1]}`}
            fill="#fff"
            y={positionTextSizeLine[1] - 14}
            x={positionTextSizeLine[0] - 20}
            rx={0}
            ry={0}
          />
          <Text
            onPress={() => onPressLine(id)}
            key={`backgroundSizeText${id}`}
            textAnchor="middle"
            fill="#000"
            y={positionTextSizeLine[1]}
            x={positionTextSizeLine[0]}
            fontSize={14}>
            {`${line.distance}in`}
          </Text>
        </>
      )}
    </G>
  );
};
