import { LINE_TYPE, POINT_TYPE } from '@models';

export const getPositionTextAngle = (line1: LINE_TYPE): POINT_TYPE => {
  return [line1.points[1][0] + 5, line1.points[1][1] + 5];
};

export const getPositionRectAngle = ({
  line,
  sizeRect,
  nextLine,
}: {
  line: LINE_TYPE;
  sizeRect: number;
  nextLine?: LINE_TYPE;
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

  if (!nextLine) {
    return [dataX, dataY];
  }

  const { points: nextPoints } = nextLine;

  if (isVertical) {
    const lastPointNextLine = nextPoints[1][0];
    const isToUp = pointY2 > pointY1;

    let dataPositionY = isToUp ? dataY - sizeRect : dataY;
    let dataPositionX = dataX;

    if (pointX2 > lastPointNextLine) {
      dataPositionX = dataPositionX - sizeRect;
    }
    return [dataPositionX, dataPositionY];
  }

  if (isHorizontal) {
    const lastPointNextLineX = nextPoints[1][0];
    const lastPointNextLineY = nextPoints[1][1];
    const isToRight = pointX2 > pointX1;

    let dataPositionX = isToRight ? dataX - sizeRect : dataX;
    let dataPositionY = dataY;

    if (pointY2 > lastPointNextLineY) {
      dataPositionY = dataPositionY - sizeRect;
    }

    if (pointX2 === lastPointNextLineX) {
      dataPositionX = lastPointNextLineX;
    }

    if (pointX2 > pointX1) {
      dataPositionX = lastPointNextLineX - sizeRect;
    }

    return [dataPositionX, dataPositionY];
  }

  return [dataX, dataY];
};
