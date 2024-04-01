import { LINE_TYPE, POINT_TYPE } from '@models';

export const getPositionTextAngle = (line1: LINE_TYPE): POINT_TYPE => {
  return [line1.points[1][0] + 5, line1.points[1][1] + 5];
};

export const getPositionRectAngle = ({
  line,
  sizeRect,
}: {
  line: LINE_TYPE;
  sizeRect: number;
}) => {
  const { points } = line;
  const pointX1 = points[0][0];
  const pointX2 = points[1][0];

  const pointY1 = points[0][1];
  const pointY2 = points[1][1];

  const isHorizontal = pointY1 === pointY2;
  const isVertical = pointX1 === pointX2;

  const dataY = pointY2;
  const dataX = pointX2 > pointX1 ? pointX2 : pointX1;

  if (isHorizontal) {
    if (pointX1 > pointX2) {
      return [dataX, dataY + sizeRect];
    }
    return [dataX - sizeRect, dataY - sizeRect];
  }

  if (isVertical) {
    if (pointY1 > pointY2) {
      return [dataX, dataY];
    }
    return [dataX, dataY - sizeRect];
  }

  return [dataX, dataY];
};
