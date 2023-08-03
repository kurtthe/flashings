import { CoordsType, LETTER_LINES, MakeLine, PointType } from './types';
import * as shape from 'd3-shape';
import { parse, serialize } from 'react-native-redash';
import React from 'react';
import { Path as PathComponent, Text, G } from 'react-native-svg';
<<<<<<< Updated upstream
import { valuePending } from '@features/flashing/utils';
=======
import { ScaleXBar, valuePending } from '@features/flashing/utils';
>>>>>>> Stashed changes

const calculateParallelLine = (
  point1: PointType,
  point2: PointType | undefined,
): PointType => {
  const offset = 10;

  if (!point2) return [point1[0], point1[1] - 5];

  const pending = valuePending(point1, point2);
  console.log('=>pending::', pending);

  if (pending === 0) {
    return [point1[0] + offset, point1[1] - offset];
  }

  if (isFinite(pending)) {
    return [point1[0] + offset, point1[1]];
  }

  return point2;
};
const calculatePositionText = (
  pointInit: PointType,
  pointFinal: PointType | undefined,
) => {
  if (!pointFinal) {
    return pointInit;
  }

  const scaleNumber = 0.5;
  const isHorizontal = pointInit[1] === pointFinal[1];
  const isVertical = pointInit[0] === pointFinal[0];

  if (isHorizontal) {
    return [
      pointInit[0] + pointFinal[0] / 1.5,
      pointInit[1] - scaleNumber * 25,
    ];
  }

  if (isVertical) {
    return [
      pointInit[0] - scaleNumber * 25,
      (pointInit[1] + pointFinal[1]) / 1.5,
    ];
  }

  return [
    (pointInit[0] + pointFinal[0]) / 2 + scaleNumber * 25,
    (pointInit[1] + pointFinal[1]) / 2 + scaleNumber * 25,
  ];
};

export const makeLines = ({
  pointers,
  onPressLine,
  widthGraph,
  heightGraph,
}: MakeLine & { widthGraph: number; heightGraph: number }) => {
  if (pointers.length < 1) return [];

  const parallelPoints: MakeLine['pointers'] = pointers.map((p, index) => ({
    ...p,
    point: calculateParallelLine(p.point, pointers[index + 1]?.point),
  }));

  return buildLines({
    pointers,
    parallelPoints,
    onPressLine,
  });
};

const buildLines = ({
  pointers,
  parallelPoints,
  onPressLine,
}: MakeLine & {
  showLetterLine?: boolean;
  parallelPoints: CoordsType[];
}) => {
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);

  return pointers.map(({ point }, index) => {
    const fontSize = 20;
    const colorLabel = '#8F94AE';

    const positionText = calculatePositionText(
      point,
      pointers[index + 1]?.point,
    );

    const linePoint = (contentPoints: CoordsType[], space: number = 0) => {
      const valuePoint = contentPoints[index].point;
      const valueNextPoint = contentPoints[index + 1]
        ? contentPoints[index + 1].point
        : contentPoints[index].point;

      return parse(generatorLine([valuePoint, valueNextPoint]) as string);
    };

    return (
      <G key={`groupPath${index}`}>
        <Text
          key={`nameLine${index}`}
          textAnchor="middle"
          fill={colorLabel}
          fontSize={fontSize}
          x={positionText[0]}
          y={positionText[1]}>
          {LETTER_LINES[index]}
        </Text>
        <PathComponent
          onPress={() => onPressLine(index)}
          key={`normalLine${index}`}
          d={serialize(linePoint(pointers))}
          strokeWidth={1}
          stroke="#000"
        />
        <PathComponent
          onPress={() => onPressLine(index)}
          key={`selectLine${index}`}
          d={serialize(linePoint(parallelPoints))}
          strokeWidth={1}
          stroke="#0056FF"
        />
      </G>
    );
  });
};
