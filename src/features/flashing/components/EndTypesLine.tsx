import React from 'react'
import { BaseTouchable, Box,  Icon, IconButton, Text } from "@ui/components";
import {
	EndBreakLeft2Icon,
	EndBreakLeftIcon, EndBreakRight2Icon,
	EndBreakRightIcon,
	EndCurveLeftIcon,
	EndCurveRightIcon
} from "@assets/icons";
import { StyleSheet, ViewStyle } from "react-native";
import { TYPE_END_LINES } from "@models";

type Props = {
	changeStartTypeLine: (startType: TYPE_END_LINES)=> void;
	changeEndTypeLine: (endType: TYPE_END_LINES)=> void;
}

const ButtonEndType = (
	{ title, icon, fullWidth=false, style={}, onPress, active=false }:
	{title: string; icon?: any, fullWidth?:boolean; style?: ViewStyle; onPress?: ()=> void; active?: boolean}
)=> {
	return (
		<BaseTouchable onPress={()=> onPress && onPress()} my="xs" mx="s" backgroundColor={active? "lightBlue" : "transparent"} style={[styles.button, fullWidth && {width: '95%'}, style]}>
			<Text textAlign={!icon? 'center': 'left'} variant="bodyRegular" mx="s">{title}</Text>
			{icon && <IconButton icon={<Icon as={icon} size={40} color="grayIcon" />} />}
		</BaseTouchable>
	);
}
const EndTypesLine: React.FC<Props> = ({changeStartTypeLine,changeEndTypeLine}) => {
	const [currentValueStartSelected, setCurrentValueStartSelected] = React.useState<TYPE_END_LINES>("none")
	const [currentValueEndSelected, setCurrentValueEndSelected] = React.useState<TYPE_END_LINES>("none")

	const handlePressButton = (label: TYPE_END_LINES= "none", startLine: boolean= false) => {
		if(startLine){
			changeStartTypeLine(label)
			setCurrentValueStartSelected(label)
			return;
		}
		changeEndTypeLine(label)
		setCurrentValueEndSelected(label)
	}
	const handleClearLineType = () => {
		setCurrentValueStartSelected("none")
		setCurrentValueEndSelected("none")

		changeStartTypeLine("none")
		changeEndTypeLine("none")
	}

	return (
		<Box flex={1} backgroundColor="white" p="m">
			<Text variant="bodyBold" mx="s">End Type - Start | End</Text>
			<Box py="m" flexDirection="row" flexWrap="wrap">
				<ButtonEndType title="None" active={currentValueEndSelected === "none" || currentValueStartSelected === "none"} onPress={()=> handleClearLineType()} fullWidth style={{height: 60}} />

				<ButtonEndType title="Safety" active={currentValueStartSelected === "safetyStart"} onPress={()=> handlePressButton('safetyStart', true)} icon={EndCurveLeftIcon}/>
				<ButtonEndType title="Safety" active={currentValueEndSelected === "safetyEnd"} onPress={()=> handlePressButton('safetyEnd')} icon={EndCurveRightIcon}/>

				<ButtonEndType title="Break" active={currentValueStartSelected === "break2Start"} onPress={()=> handlePressButton('break2Start', true)}  icon={EndBreakLeft2Icon}/>
				<ButtonEndType title="Break" active={currentValueEndSelected === "break2End"} onPress={()=> handlePressButton('break2End')} icon={EndBreakRight2Icon}/>

				<ButtonEndType title="Break" active={currentValueStartSelected === "break1Start"} onPress={()=> handlePressButton('break1Start', true)} icon={EndBreakLeftIcon}/>
				<ButtonEndType title="Break" active={currentValueEndSelected === "break1End"} onPress={()=> handlePressButton('break1End')} icon={EndBreakRightIcon} />
			</Box>
		</Box>
	)
}

const styles = StyleSheet.create({
	button: {
		width: '45%',
		flexDirection: 'row',
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#828489',
		alignItems: 'center',
		justifyContent: 'space-between'

	}
})
export default EndTypesLine
