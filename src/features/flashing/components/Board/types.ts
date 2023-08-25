import { Dimensions } from 'react-native';
import { ReactElement } from 'react';
import { MODES_BOARD } from "@features/flashing/components/Board/Board";

export type COORDS_TYPE = {
  point: LINE_TYPE;
  sizeLine: string;
};

export type POINT_TYPE = [number, number];

export type MAKE_LINE = {
  lines: LINE_TYPE[];
  onPressLine: (numberLine: number) => void;
  mode: string;
  rightLinePaint?: boolean;
};

export type BUILD_LINE = {
  id: number;
  line: LINE_TYPE;
  onPressLine: (numberLine: number) => void;
  mode: MODES_BOARD;
  rightLinePaint?: boolean;
};
export const SIZE_POINTER = 4;
export const SIZE_POINTER_LAST = 8;
export const widthScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height;
type Boundaries = [number, number];
export type ScaleFunction = (value: number) => number;

export const rescale =
  (from: Boundaries, to: Boundaries) =>
  (scale: ScaleFunction): ScaleFunction => {
    const scaledFrom = from.map(scale);
    const ratio = (to[1] - to[0]) / (scaledFrom[1] - scaledFrom[0]);
    return value => (scale(value) - scaledFrom[0]) * ratio + to[0];
  };

export const CIRCLE_RADIUS = 15;

export type LINE_TYPE = {
  points: POINT_TYPE[];
  pending: number;
  distance: number;
  isLine: boolean;
  letterLine?: string;
};

export type DREW_LINE_TYPE = LINE_TYPE & {
  path: ReactElement | undefined;
};

export type LINE_SELECTED = {
  sizeLine: number;
  numberLine: number;
};
export const LETTER_LINES = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Z',
];

export const casesLineParallel = ({
  points,
  offset,
}: {
  points: POINT_TYPE[];
  offset: number;
}): TYPE_PARALLEL_LINES => {
  return {
    horizontal: {
      someOnePointMajor: {
        left: [
          [points[0][0], points[0][1] + offset],
          [points[1][0], points[0][1] + offset],
        ],
        right: [
          [points[0][0], points[0][1] - offset],
          [points[1][0], points[1][1] - offset],
        ],
      },
      default: {
        left: [
          [points[0][0], points[0][1] - offset],
          [points[1][0], points[0][1] - offset],
        ],
        right: [
          [points[0][0], points[0][1] + offset],
          [points[1][0], points[1][1] + offset],
        ],
      },
    },
    vertical: {
      someOnePointMajor: {
        left: [
          [points[0][0] + offset, points[0][1]],
          [points[1][0] + offset, points[1][1]],
        ],
        right: [
          [points[0][0] - offset, points[0][1]],
          [points[1][0] - offset, points[1][1]],
        ],
      },
      default: {
        left: [
          [points[0][0] - offset, points[0][1]],
          [points[1][0] - offset, points[1][1]],
        ],
        right: [
          [points[0][0] + offset, points[0][1]],
          [points[1][0] + offset, points[1][1]],
        ],
      },
    },
    pendingPositive: {
      someOnePointMajor: {
        left: [
          [points[0][0] + offset, points[0][1] - offset],
          [points[1][0] + offset, points[1][1] - offset],
        ],
        right: [
          [points[0][0] - offset, points[0][1] + offset],
          [points[1][0] - offset, points[1][1] + offset],
        ],
      },
      default: {
        left: [
          [points[0][0] - offset, points[0][1] + offset],
          [points[1][0] - offset, points[1][1] + offset],
        ],
        right: [
          [points[0][0] + offset, points[0][1] - offset],
          [points[1][0] + offset, points[1][1] - offset],
        ],
      },
    },
    pendingNegative: {
      someOnePointMajor: {
        left: [
          [points[0][0] + offset, points[0][1] + offset],
          [points[1][0] + offset, points[1][1] + offset],
        ],
        right: [
          [points[0][0] - offset, points[0][1] - offset],
          [points[1][0] - offset, points[1][1] - offset],
        ],
      },
      default: {
        left: [
          [points[0][0] - offset, points[0][1] - offset],
          [points[1][0] - offset, points[1][1] - offset],
        ],
        right: [
          [points[0][0] + offset, points[0][1] + offset],
          [points[1][0] + offset, points[1][1] + offset],
        ],
      },
    },
    default: points,
  };
};

type SIDES_LINES = {
  right: POINT_TYPE[];
  left: POINT_TYPE[];
};

type DATA_SIDE_POINTS = {
  someOnePointMajor: SIDES_LINES;
  default: SIDES_LINES;
};

export type TYPE_PARALLEL_LINES = {
  horizontal: DATA_SIDE_POINTS;
  vertical: DATA_SIDE_POINTS;
  pendingNegative: DATA_SIDE_POINTS;
  pendingPositive: DATA_SIDE_POINTS;
  default: POINT_TYPE[];
};
