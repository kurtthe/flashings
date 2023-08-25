import React from 'react';
import { DREW_LINE_TYPE, LINE_TYPE, MAKE_LINE } from "./types";
import LineMadeComponent from '@features/flashing/components/Line';
import {
  buildPathLineParallel,
  calculateAngle,
  calculateParallelLines
} from "@features/flashing/utils";
import { Path } from 'react-native-redash';

export const drawLines = ({
  lines,
  onPressLine,
  mode = "draw",
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
            {...{ id: index, line, onPressLine, mode, rightLinePaint, showAngle: angle }}
          />
        ) : undefined,
    })
  });
};

export const drawParallelLines = (lines: LINE_TYPE[],  rightLinePaint=true):Path | null=>{
  if(!lines.length || lines[0].points.length <= 1) {
    return null;
  }
  const allPoints = calculateParallelLines(lines, rightLinePaint)
  // console.log("allPoints::", allPoints.flat(1))
  return buildPathLineParallel(allPoints.flat(1))
}
