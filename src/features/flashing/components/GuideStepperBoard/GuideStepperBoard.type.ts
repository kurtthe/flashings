import { getIndexOfStepForName } from '@features/flashing/utils';

export type GUIDE_STEP = {
  title: string;
  step: number;
  description: string;
  action: ACTIONS_STEP | undefined;
};

export type ACTIONS_STEP = {
  key: TYPE_ACTIONS_STEP;
  title: string;
  options: string[];
  defaultOption: string;
};

export enum TYPE_ACTIONS_STEP {
  SIDE_PAINT_EDGE = 'side_paint_edge',
  SIDE_TAPERED = 'side_tapered',
}

export type VALUE_ACTIONS = {
  [TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE]: string;
  [TYPE_ACTIONS_STEP.SIDE_TAPERED]: string;
};

export const guideSteps: GUIDE_STEP[] = [
  {
    step: getIndexOfStepForName('draw'),
    title: 'Draw Points',
    description: `Don’t draw safety folds or breaks.${'\n'}When finished press Next`,
    action: undefined,
  },
  {
    step: getIndexOfStepForName('side'),
    title: 'Specify Side Paint Edge',
    description: '',
    action: {
      title: '',
      options: ['Left', 'Right'],
      key: TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE,
      defaultOption: 'Right',
    },
  },
  {
    step: getIndexOfStepForName('measurements'),
    title: 'Enter Measurements',
    description: '',
    action: undefined,
  },
  {
    step: getIndexOfStepForName('tapered'),
    title: 'Enter Measurements',
    description: '',
    action: {
      title: '',
      options: ['Front', 'Back'],
      key: TYPE_ACTIONS_STEP.SIDE_TAPERED,
      defaultOption: 'Front',
    },
  },
  {
    step: getIndexOfStepForName('save_tapered'),
    title: '',
    description: '',
    action: {
      title: '',
      options: ['Front', 'Back'],
      key: TYPE_ACTIONS_STEP.SIDE_TAPERED,
      defaultOption: 'Front',
    },
  },
];
