import React from 'react';
import { DREW_LINE_TYPE, MAKE_LINE } from './types';
import LineMadeComponent from '@features/flashing/components/Line';

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
      line.points.length === 2 ? (
        <LineMadeComponent {...{ id: index, line, onPressLine, isDrawing }} />
      ) : undefined,
  }));
};
