import React from 'react';
import { DREW_LINE_TYPE, LINE_TYPE, MAKE_LINE, POINT_TYPE } from "./types";
import LineMadeComponent from '@features/flashing/components/Line';
import { buildPathLineParallel, calculateParallelLine } from "@features/flashing/utils";
import { Path } from 'react-native-redash';

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

  return lines.map((line, index) => ({
    ...line,
    path:
      line.points.length === 2 ? (
        <LineMadeComponent
          {...{ id: index, line, onPressLine, isDrawing, rightLinePaint }}
        />
      ) : undefined,
  }));
};

export const drawParallelLines = (lines: LINE_TYPE[],  rightLinePaint=true):Path | null=>{
  if(!lines.length || lines[0].points.length <= 1) {
    return null;
  }

  const allPoints = lines.map(line =>[ calculateParallelLine(line, rightLinePaint)])

  console.log("=>allPoints::", allPoints.flat(2))
  return buildPathLineParallel(allPoints.flat(2))
}
