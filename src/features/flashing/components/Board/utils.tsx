import React from 'react';
import { DREW_LINE_TYPE, MAKE_LINE } from './types';
import LineMadeComponent from '@features/flashing/components/Line';
import {
  buildPathLineParallel,
  calculateParallelLines,
} from '@features/flashing/utils';
import { Path } from 'react-native-redash';
import { LINE_TYPE } from '@models';

export const drawLines = ({
  lines,
  lineSelected,
  step = 0,
  rightLinePaint = true,
  typeSelected,
  anglesLines,
}: MAKE_LINE & {
  widthGraph: number;
  heightGraph: number;
  typeSelected: 'line' | 'angle';
  anglesLines: number[];
}): DREW_LINE_TYPE[] => {
  if (lines.length < 1) return [];

  return lines.map((line, index, arrayLines) => {
    return {
      ...line,
      path:
        line.points.length === 2 ? (
          <LineMadeComponent
            {...{
              id: index,
              line,
              lineSelected,
              step,
              rightLinePaint,
              typeSelected,
              angle: anglesLines[index],
              nextLine: arrayLines[index + 1],
            }}
          />
        ) : undefined,
    };
  });
};

export const drawParallelLines = (
  lines: LINE_TYPE[],
  rightLinePaint = true,
): Path | null => {
  if (!lines.length || lines[0].points.length <= 1) {
    return null;
  }
  const allPoints = calculateParallelLines(lines, rightLinePaint);
  return buildPathLineParallel(allPoints.flat(1));
};
