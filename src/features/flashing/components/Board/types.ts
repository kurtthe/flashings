import {Dimensions} from 'react-native';
import {ReactElement} from 'react';
import {LINE_TYPE, MODES_BOARD, POINT_TYPE} from '@models';
import {isTablet} from '@shared/platform';
export const STEPS_BOARD: MODES_BOARD[] = [
  'draw',
  'side',
  'measurements',
  'end_type',
  'finish',
  'preview',
  'tapered',
  'save_tapered',
];

export type MAKE_LINE = {
  lines: LINE_TYPE[];
  rightLinePaint?: boolean;
  lineSelected: number;
};

export type BUILD_LINE = {
  id: number;
  line: LINE_TYPE;
  lineSelected: number;
  rightLinePaint?: boolean;
  nextLine?: LINE_TYPE;
};
export const SIZE_POINTER = isTablet ? 6 : 4;
export const widthScreen = Dimensions.get('window').width;
export const heightScreen = Dimensions.get('window').height * 2;

export const CIRCLE_RADIUS = 15;

export type DREW_LINE_TYPE = LINE_TYPE & {
  path: ReactElement | undefined;
};

export type LINE_SELECTED = {
  sizeLine: number;
  numberLine: number;
  angle: number | undefined;
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
