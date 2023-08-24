import React from 'react';
import { Box, Button, Card, Divider, Text } from "@ui/components";
import { StyleSheet } from "react-native";
import {
	GUIDE_STEP,
	guideSteps, TYPE_ACTIONS_STEP,
	VALUE_ACTIONS
} from "@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type";

type Props = {
	step: number;
	onFinish: ()=>void;
	onChangeOption?: (newValue: string)=> void;
}
const GuideStepperBoardComponent: React.FC<Props> = ({ onFinish, step=1,onChangeOption }) => {
	const [{ action, description, title }, setDataStep] = React.useState<GUIDE_STEP>(guideSteps[step])
	const [optionSelected, setOptionSelected] = React.useState<VALUE_ACTIONS>({
		[TYPE_ACTIONS_STEP.SIDE_PAINT_EDGE]: action?.defaultOption ?? ''
	})

	React.useEffect(() =>{
		const lengthSteps = guideSteps.length
		const newDataStep = guideSteps[1];

		setDataStep(newDataStep)
		step >= lengthSteps && onFinish()

	}, [step, guideSteps])

	const handleChangeOptionAction = (keyValue: TYPE_ACTIONS_STEP,newValue: string) => {
		setOptionSelected({...optionSelected, [keyValue]: newValue})
		onChangeOption && onChangeOption(newValue)
	}

	const isOptionSelected = (keyValue: TYPE_ACTIONS_STEP, option: string) => {
		return option === optionSelected[keyValue];
	}

	return (
		<Box style={styles.container} width="100%" p="m">
			<Card variant="guide">
				<Box>
					<Text variant="bodyBold" textAlign="center">{title}</Text>
					<Text variant="bodyRegular" textAlign="center">{description}</Text>
				</Box>
			</Card>
			{
				action && (
					<Card my="s">
						<Box>
							{action.title && (
								<>
									<Text textAlign="center">{action.title}</Text>
									<Divider my="s" />
								</>
							)}
							<Box>
								{action.options.map((option, index) => ( <Button
									key={`button-option-action-${index}`}
									my="xs"
									variant={isOptionSelected(action.key, option.toLowerCase()) ? 'smallMenuActive' : 'smallMenu'}
									onPress={() => handleChangeOptionAction(action.key, option.toLowerCase())}
									backgroundColor={isOptionSelected(action.key, option.toLowerCase())  ? 'primaryBlue' : 'white'}>
									{option}
								</Button>))}
							</Box>
						</Box>
					</Card>
				)
			}
		</Box>

	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: 'transparent',
		top: 30,
		left: 0,
		zIndex: 1,

		alignItems: 'center',
		justifyContent: 'center',
	},

});

export default GuideStepperBoardComponent
