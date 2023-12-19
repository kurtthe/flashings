export type GUIDE_STEP = {
	title: string;
	description: string;
	action:  ACTIONS_STEP | undefined;
}

export type ACTIONS_STEP = {
	key: TYPE_ACTIONS_STEP;
	title: string;
	options: string[];
	defaultOption: string;
}

export enum TYPE_ACTIONS_STEP {
	SIDE_PAINT_EDGE= 'side_paint_edge'
}

export type VALUE_ACTIONS = {
	[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE]: string
}

export const guideSteps: GUIDE_STEP[] = [
	{
		title: 'Draw Points',
		description: 'Don’t draw safety folds or breaks  /n  When finished press Next',
		action: undefined,
	},
	{
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
		title: 'Enter Measurements',
		description: '',
		action: undefined,
	},

]
