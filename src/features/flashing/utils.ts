import {
  ALIGN_BARS,
  LINE_OFFSET,
  PADDING_BARS,
} from '@features/flashing/components/Grid/Grid.types';
import { scaleBand } from 'd3-scale';
import {
  casesLineParallel,
} from '@features/flashing/components';
import { parse, round, serialize } from 'react-native-redash';
import * as shape from 'd3-shape';
import { isNaN } from "lodash";
import { LINE_TYPE, POINT_TYPE } from "@models";

type ScaleColumnType = {
  domainData: string[];
  sizeScreen: number;
  paddingInner?: number;
  paddingOuter?: number;
  align?: number;
};

const scaleColumns = ({
  domainData,
  sizeScreen,
  paddingInner = PADDING_BARS,
  paddingOuter = PADDING_BARS,
  align = ALIGN_BARS,
}: ScaleColumnType) =>
  scaleBand()
    .domain(domainData)
    .range([LINE_OFFSET, sizeScreen - LINE_OFFSET])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter)
    .align(align)
    .round(true);

export const ScaleXBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);

export const ScaleYBar = (dataScale: ScaleColumnType) =>
  scaleColumns(dataScale);

export const findClosestNumber = (
  dataNumber: number[],
  valueNumber: number,
) => {
  let closest = dataNumber[0];
  let minDifference = Math.abs(valueNumber - dataNumber[0]);

  for (let i = 1; i < dataNumber.length; i++) {
    const difference = Math.abs(valueNumber - dataNumber[i]);
    if (difference < minDifference) {
      minDifference = difference;
      closest = dataNumber[i];
    }
  }

  return closest;
};

export const calculatePending = (point1: POINT_TYPE, point2: POINT_TYPE) => {
  return (point2[1] - point1[1]) / (point2[0] - point1[0]);
};

const calculateExponential = (value: number, toExponential: number = 2) =>
  Math.pow(value, toExponential);

/**
 * function to  calculate the distance between two points of the line
 * @param point1
 * @param point2
 * D = √(x2-x1)^2 +(y2-y1)^2
 */
export const calculateSizeLine = (
  point1: [number, number],
  point2: [number, number] | undefined,
): number => {
  const pointSecond = !point2 ? point1 : point2;

  const deltaX = pointSecond[0] - point1[0];
  const deltaY = pointSecond[1] - point1[1];

  const sumDeltas = calculateExponential(deltaX) + calculateExponential(deltaY);

  const result = Math.sqrt(sumDeltas);
  return round(result, 0);
};




export const validateLineComplete = (lines: LINE_TYPE[]): boolean => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points.length === 2;
};

export const getLastPoint = (lines: LINE_TYPE[]) => {
  const lastLine = lines[lines.length - 1];
  return lastLine.points[lastLine.points.length - 1];
};

const getPointParallel = ({line, offset, isRight}:{line: LINE_TYPE; offset: number, isRight: boolean}) =>{
  const {points, pending} = line
  const pointX1 = points[0][0];
  const pointX2 = points[1][0];

  const pointY1 = points[0][1];
  const pointY2 = points[1][1];
  const side = isRight ? 'right' : 'left';
  const isHorizontal = pointY1 === pointY2;
  const isVertical = pointX1 === pointX2;

  const pointsLineParallel = casesLineParallel({
    points,
    offset,
  });

  if (isHorizontal) {
    const dataHorizontal = pointsLineParallel.horizontal;
    return pointX2 > pointX1
      ? dataHorizontal.someOnePointMajor[side]
      : dataHorizontal.default[side];
  }

  if (isVertical) {
    const dataVertical = pointsLineParallel.vertical;
    return pointY1 > pointY2
      ? dataVertical.someOnePointMajor[side]
      : dataVertical.default[side];
  }

  if (pending > 0) {
    const dataPendingPositive = pointsLineParallel.pendingPositive;
    return pointY1 > pointY2
      ? dataPendingPositive.someOnePointMajor[side]
      : dataPendingPositive.default[side];
  }

  if (pending < 0) {
    const dataPendingNegative = pointsLineParallel.pendingNegative;
    return pointY1 > pointY2
      ? dataPendingNegative.someOnePointMajor[side]
      : dataPendingNegative.default[side];
  }
  return pointsLineParallel.default;
}
export const calculateParallelLines = (
  lines: LINE_TYPE[],
  isRight: boolean = true,
): POINT_TYPE[][] => {
  const offset = 10;

  return lines.map((line, index, arrayLines): POINT_TYPE[] => {
    const currentLineParallel = getPointParallel({line, isRight, offset})

    const previousLine = arrayLines[index - 1]
    const nextLine = arrayLines[index + 1]

    if(previousLine && !nextLine){
      const previousLineParallel = getPointParallel({line: previousLine, isRight, offset})
      const pointIntersection = calculatePointsIntersectionBetweenLines({...previousLine, points: previousLineParallel}, {...line, points: currentLineParallel} );

      if(!pointIntersection) return currentLineParallel
      return [pointIntersection, currentLineParallel[1] ]
    }

    if(!previousLine && nextLine){

      const nextLineParallel = getPointParallel({line: nextLine, isRight, offset})
      const pointIntersectionNext = calculatePointsIntersectionBetweenLines({...line, points: currentLineParallel}, {...nextLine, points: nextLineParallel});

      if(!pointIntersectionNext) return currentLineParallel
      return [currentLineParallel[0], pointIntersectionNext]
    }

    if(previousLine && nextLine){
      const previousLineParallel = getPointParallel({line: previousLine, isRight, offset})
      const nextLineParallel = getPointParallel({line: nextLine, isRight, offset})

      const pointIntersectionPrevious = calculatePointsIntersectionBetweenLines({...previousLine, points: previousLineParallel}, {...line, points: currentLineParallel} );
      const pointIntersectionNext = calculatePointsIntersectionBetweenLines({...line, points: currentLineParallel}, {...nextLine, points: nextLineParallel});

      if(!pointIntersectionPrevious || !pointIntersectionNext) return currentLineParallel
      return [pointIntersectionPrevious, pointIntersectionNext]
    }
    return currentLineParallel
  })
};

/**
 * function to  calculate the point half between lines
 * @param line
 * this is the equation[(x1+x2)/2, (y1+y2)/2]
 */
export const calculatePointHalf = (
  line: LINE_TYPE,
): POINT_TYPE => {

  const x1 = line.points[0][0]
  const x2 = line.points[1][0]

  const y1 = line.points[0][1]
  const y2 = line.points[1][1]

  const xPoint = (x1 + x2) / 2
  const yPoint = (y1 + y2) / 2
  return [round(xPoint, 0),round(yPoint, 0)]
};

export const positionEndLine = (line1: LINE_TYPE): POINT_TYPE=> {
  return [line1.points[1][0]+5, line1.points[1][1]+5];
}

export const buildPathLine = (points: LINE_TYPE['points']) => {
  const generatorLine = shape
    .line()
    .x(data => data[0])
    .y(data => data[1])
    .curve(shape.curveLinear);
  return serialize(parse(generatorLine(points) as string));
};

export const buildPathLineParallel = (points: LINE_TYPE['points']) => {
  return parse(shape
      .line()
      .x(data => data[0])
      .y(data => data[1])
      .curve(shape.curveLinear)(points) as string)
};

/*
 * function calculate the  angle between two lines
 * ∠ = arctan((m2-m1)/(1+m1*m2))
 * */
export const calculateAngle = (firstLine: LINE_TYPE, secondLine: LINE_TYPE | undefined): number | undefined=> {
  if(!secondLine) return undefined

  const m1 = firstLine.pending === Infinity  || firstLine.pending  === -Infinity? 120 : firstLine.pending
  const m2 = secondLine.pending  === Infinity || secondLine.pending  === -Infinity ? 120 : secondLine.pending

  const subtractionPending = m2 - m1
  const multiplePending = m2*m1
  const numerator = 1 + multiplePending
  const resultA = subtractionPending / numerator
  const angleRad = Math.atan(resultA)
  let angleDeg = angleRad * 180 / Math.PI

  if(angleDeg <= 0){
    angleDeg = 180 - Math.abs(angleDeg)
  }
  return round(angleDeg, 0)
}

const createEquationOfLine = (line: LINE_TYPE): string=> {
  const x1 = line.points[0][0]
  const y1 = line.points[0][1]

  const pendingMultiplyX1 = line.pending*(x1 * -1)
  const sumY1PendingMultiply = pendingMultiplyX1 + y1

  return `${line.pending}x${sumY1PendingMultiply > 0 ? '+': ''}${sumY1PendingMultiply}`
}

const resolveEqWithValueX = (eq: string, valueX: number)=>{
  const eqWithValueX = eq.replace('x', `*${valueX}`)
  return eval(eqWithValueX)

}

const calculatePointsIntersectionBetweenLines = (line1: LINE_TYPE, line2: LINE_TYPE | undefined):POINT_TYPE | null=>{

  if(!line2) return null;

  const eq1 = createEquationOfLine(line1)
  const eq2 = createEquationOfLine(line2)

  if(eq1.includes('Infinity')){
    if(line2.pending === 0){
      return [line1.points[0][0], line2.points[0][1]]
    }
    const yPoint = resolveEqWithValueX(eq2, line1.points[0][0])
    return [line1.points[0][0], yPoint]
  }

  if(eq2.includes('Infinity')){
    return [line2.points[0][0], line1.points[1][1]]
  }

  const paramsEq1 = eq1.split('x')
  const paramsEq2 = eq2.split('x')

  const paramPending1 = parseFloat(paramsEq1[0])
  const paramPending2 = parseFloat(paramsEq2[0]) * -1

  const result = paramPending1 + paramPending2

  const paramB1 = parseFloat(paramsEq1[1]) * -1
  const paramB2 = parseFloat(paramsEq2[1])

  const result2 = paramB1 + paramB2
  const xPoint = result2/ result

  if(isNaN(xPoint)){
    return null
  }

  const yPoint = resolveEqWithValueX(eq1, xPoint)

  return [xPoint, yPoint]
}
