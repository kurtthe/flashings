import { BUILD_LINE, DREW_LINE_TYPE, LINE_TYPE, MAKE_LINE } from './types';
import * as shape from 'd3-shape';
import { parse, serialize } from 'react-native-redash';
import React from 'react';
import { Path as PathComponent } from 'react-native-svg';
import { calculateParallelLine } from '@features/flashing/utils';

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
  const pointsParallel = calculateParallelLine(line);
  console.log('line points::', line.points);
  console.log('pointsParallel::', pointsParallel);
  return (
    <>
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
    </>
  );
};
