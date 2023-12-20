import React from 'react'
import { BaseTouchable, Box,  Icon, Text } from "@ui/components";
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
	changeStartTypeLine?: (startType: TYPE_END_LINES)=> void;
	changeEndTypeLine?: (endType: TYPE_END_LINES)=> void;
	startTypeLine: TYPE_END_LINES;
	endTypeLine: TYPE_END_LINES;
}

const ButtonEndType = (
	{ title, icon, fullWidth=false, style={}, onPress, active=false }:
	{title: string; icon?: any, fullWidth?:boolean; style?: ViewStyle; onPress?: ()=> void; active?: boolean}
)=> {
	return (
		<BaseTouchable onPress={()=> onPress && onPress()} my="xxs" mx="s" backgroundColor={active? "lightBlue" : "transparent"} style={[styles.button, fullWidth && {width: '95%'}, style]}>
			<Text textAlign={!icon? 'center': 'left'} variant="bodyRegular" mx="s">{title}</Text>
			{icon && <Icon as={icon} size={30} color="grayIcon" />}
		</BaseTouchable>
	);
}
const EndTypesLine: React.FC<Props> = ({changeStartTypeLine,changeEndTypeLine,  startTypeLine="none", endTypeLine= "none"}) => {
	const [currentValueStartSelected, setCurrentValueStartSelected] = React.useState<TYPE_END_LINES>(startTypeLine)
	const [currentValueEndSelected, setCurrentValueEndSelected] = React.useState<TYPE_END_LINES>(endTypeLine)
	const [typeLine, setTypeLine] = React.useState<'start'| 'end'>('start')
	const handlePressButton = (label: TYPE_END_LINES= "none") => {
		if(typeLine==="start"){
			changeStartTypeLine && changeStartTypeLine(label)
			setCurrentValueStartSelected(label)
			return;
		}
		changeEndTypeLine && changeEndTypeLine(label)
		setCurrentValueEndSelected(label)
	}
	const handleClearLineType = () => {
		if(typeLine === "start"){
			setCurrentValueStartSelected("none")
			changeStartTypeLine && changeStartTypeLine("none")
			return
		}
		setCurrentValueEndSelected("none")
		changeEndTypeLine && changeEndTypeLine("none")
	}
	const validateTypeLine = (typeLineStartEnd: TYPE_END_LINES) => {
		if(typeLine==="start"){
			return currentValueStartSelected === typeLineStartEnd
		}
		return currentValueEndSelected === typeLineStartEnd
	}

	return (
		<Box flex={1} backgroundColor="white" p="m">
			<Box flexDirection="row" pt="s" mx="s" alignItems="center" justifyContent="space-between">
				<Text variant="bodyBold" >End Type</Text>
				<Box flexDirection="row">
					<Text fontWeight="600" fontSize={18} mr="s" variant={typeLine === 'start' ? "typeJobActive" :"typeJob"} onPress={() => setTypeLine('start')}>Start</Text>
					<Text fontWeight="600" fontSize={18} variant={typeLine === 'end' ? "typeJobActive" :"typeJob"} onPress={() => setTypeLine('end')}>End</Text>
				</Box>
			</Box>
			<Box py="m" flexDirection="row" flexWrap="wrap">
				<ButtonEndType title="None" fullWidth style={{height: 40}} active={validateTypeLine("none")} onPress={()=> handleClearLineType()}  />
				<ButtonEndType title="Safety" active={validateTypeLine(`safety${typeLine === 'end'? '2': '1'}Left`)} onPress={()=> handlePressButton(`safety${typeLine === 'end'? '2': '1'}Left`)} icon={EndCurveLeftIcon}/>
				<ButtonEndType title="Safety" active={validateTypeLine(`safety${typeLine === 'end'? '2': '1'}Right`)} onPress={()=> handlePressButton(`safety${typeLine === 'end'? '2': '1'}Right`)}  icon={EndCurveRightIcon}/>

				<ButtonEndType title="Break" active={validateTypeLine("break2Start")} onPress={()=> handlePressButton('break2Start')}  icon={EndBreakLeft2Icon}/>
				<ButtonEndType title="Break" active={validateTypeLine("break2End")} onPress={()=> handlePressButton('break2End')} icon={EndBreakRight2Icon}/>

				<ButtonEndType title="Break" active={validateTypeLine("break1Start")} onPress={()=> handlePressButton('break1Start')} icon={EndBreakLeftIcon}/>
				<ButtonEndType title="Break" active={validateTypeLine("break1End")} onPress={()=> handlePressButton('break1End')} icon={EndBreakRightIcon} />
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
