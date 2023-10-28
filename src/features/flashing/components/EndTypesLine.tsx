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
	changeStartTypeLine: (endType: TYPE_END_LINES)=> void;
	changeEndTypeLine: (endType: TYPE_END_LINES)=> void;
}

const ButtonEndType = (
	{ title, icon, fullWidth=false, style={}, onPress }:
		{title: string; icon?: any, fullWidth?:boolean; style?: ViewStyle; onPress?: ()=> void}
)=> {
	return (
		<BaseTouchable onPress={()=> onPress && onPress()} my="xs" mx="s" style={[styles.button, fullWidth && {width: '95%'}, style]}>
			<Text textAlign={!icon? 'center': 'left'} variant="bodyRegular" mx="s">{title}</Text>
			{icon && <IconButton icon={<Icon as={icon} size={40} color="grayIcon" />} />}
		</BaseTouchable>
	);
}
const EndTypesLine: React.FC<Props> = ({changeStartTypeLine,changeEndTypeLine}) => {
	return (
		<Box flex={1} backgroundColor="white" p="m">
			<Text variant="bodyBold" mx="s">End Type - Start | End</Text>
			<Box py="m" flexDirection="row" flexWrap="wrap">
				<ButtonEndType title="None" fullWidth style={{height: 60}} />

				<ButtonEndType title="Safety" onPress={()=> changeStartTypeLine('safetyStart')} icon={EndCurveLeftIcon}/>
				<ButtonEndType title="Safety" onPress={()=> changeEndTypeLine('safetyEnd')} icon={EndCurveRightIcon}/>

				<ButtonEndType title="Break" onPress={()=> changeStartTypeLine('break2Start')}  icon={EndBreakLeft2Icon}/>
				<ButtonEndType title="Break" onPress={()=> changeEndTypeLine('break2End')} icon={EndBreakRight2Icon}/>

				<ButtonEndType title="Break" onPress={()=> changeStartTypeLine('break1Start')} icon={EndBreakLeftIcon}/>
				<ButtonEndType title="Break" onPress={()=> changeEndTypeLine('break1End')} icon={EndBreakRightIcon} />
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
