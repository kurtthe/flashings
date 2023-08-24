import React from 'react';
import { Box, Button, Card, Divider, Text } from "@ui/components";
import { StyleSheet } from "react-native";
import { GUIDE_STEP, guideSteps } from "@features/flashing/components/GuideStepperBoard/GuideStepperBoard.type";

type Props = {
	step: number;
	onFinish: ()=>void;
	onChangeOption?: (newValue: string)=> void;
}
const GuideStepperBoardComponent: React.FC<Props> = ({ onFinish, step=1,onChangeOption }) => {
	const [dataStep, setDataStep] = React.useState<GUIDE_STEP>(guideSteps[step])
	const [optionSelected, setOptionSelected] = React.useState<string | undefined>()

	React.useEffect(() =>{
		const lengthSteps = guideSteps.length
		const newDataStep = guideSteps[1];

		setDataStep(newDataStep)
		step >= lengthSteps && onFinish()

	}, [step, guideSteps])

	const handleChangeOptionAction = (newValue: string) => {
		setOptionSelected(newValue)
		onChangeOption && onChangeOption(newValue)
	}

	return (
		<Box style={styles.container} width="100%" p="m">
			<Card variant="guide">
				<Box>
					<Text variant="bodyBold" textAlign="center">{dataStep.title}</Text>
					<Text variant="bodyRegular" textAlign="center">{dataStep.description}</Text>
				</Box>
			</Card>
			{
				dataStep.action && (
					<Card my="s">
						<Box>
							{dataStep.action.title && (
								<>
									<Text textAlign="center">{dataStep.action.title}</Text>
									<Divider my="s" />
								</>
							)}
							<Box>
								{dataStep.action.options.map((option, index) => ( <Button
									key={`button-option-action-${index}`}
									my="xs"
									variant={option.toLowerCase() === optionSelected ? 'smallMenuActive' : 'smallMenu'}
									onPress={() => handleChangeOptionAction(option.toLowerCase())}
									backgroundColor={option.toLowerCase() === optionSelected  ? 'primaryBlue' : 'white'}>
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
