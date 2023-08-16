import React from 'react';
import { DREW_LINE_TYPE, MAKE_LINE } from './types';
import LineMadeComponent from '@features/flashing/components/Line';
import { calculateAngle } from "@features/flashing/utils";

export const drawLines = ({
  lines,
  onPressLine,
  isDrawing = true,
  rightLinePaint = true,
}: MAKE_LINE & {
  widthGraph: number;
  heightGraph: number;
}): DREW_LINE_TYPE[] => {
  if (lines.length < 1) return [];

  return lines.map((line, index,arrayLines) => {

    const angle = calculateAngle(line, arrayLines[index + 1])

    return ({
      ...line,
      path:
        line.points.length === 2 ? (
          <LineMadeComponent
            {...{ id: index, line, onPressLine, isDrawing, rightLinePaint, showAngle: angle }}
          />
        ) : undefined,
    })
  });
};
