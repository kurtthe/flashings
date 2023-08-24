export type GUIDE_STEP = {
	title: string;
	description: string;
	action: {
		title: string;
		options: string[];
		value: string
	} | undefined;
}

export const guideSteps: GUIDE_STEP[] = [
	{
		title: 'Draw Points',
		description: 'When finished press Next',
		action: undefined,
	},
	{
		title: 'Specify Side Paint Edge',
		description: '',
		action: {
			title: '',
			options: ['Right', 'Left'],
			value: 'right'
		},
	},
	{
		title: 'Enter Measurements',
		description: '',
		action: undefined,
	},

]
