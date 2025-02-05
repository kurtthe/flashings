import {POINT_TYPE} from '@models/index';

export const gettingCoordinatesForLabel = (
  coordinates: POINT_TYPE,
  pending: number,
  valueLabel: number,
  isRightBlueLine = true,
) => {
  const defaultValueForSidesXLeft = 15;
  const defaultValueForSidesYDown = 12;
  const addValueWhenIsNegativeY = 12;

  let positionTextX = coordinates[0] + defaultValueForSidesXLeft;
  let positionTextY = coordinates[1];

  if (pending === 0) {
    positionTextY = positionTextY - defaultValueForSidesYDown;
    positionTextX = coordinates[0];
  }

  if (pending === 270 && valueLabel < 100) {
    positionTextY = coordinates[1] + 12;
  }

  if (pending < 0) {
    positionTextY = !isRightBlueLine
      ? positionTextY + addValueWhenIsNegativeY
      : positionTextY;
  }

  return {
    positionText: [positionTextX, positionTextY],
    positionRect: [coordinates[0], coordinates[1]],
  };
};
