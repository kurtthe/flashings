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

type Props = {
	onTypeSelected?: ()=> void;
}

const ButtonEndType = ({ title, icon, fullWidth=false, style={} }: {title: string; icon?: any, fullWidth?:boolean; style?: ViewStyle;})=> {
	return (
		<BaseTouchable my="xs" mx="s" style={[styles.button, fullWidth && {width: '95%'}, style]}>
			<Text textAlign={!icon? 'center': 'left'} variant="bodyRegular" mx="s">{title}</Text>
			{icon && <IconButton icon={<Icon as={icon} size={40} color="grayIcon" />} />}
		</BaseTouchable>
	);
}
const EndTypesLine: React.FC<Props> = ({onTypeSelected}) => {
	return (
		<Box flex={1} backgroundColor="white" p="m">
			<Text variant="bodyBold" mx="s">End Type - Start | End</Text>
			<Box py="m" flexDirection="row" flexWrap="wrap">
				<ButtonEndType title="None" fullWidth style={{height: 60}} />

				<ButtonEndType title="Safety" icon={EndCurveLeftIcon}/>
				<ButtonEndType title="Safety" icon={EndCurveRightIcon}/>

				<ButtonEndType title="Break" icon={EndBreakLeft2Icon}/>
				<ButtonEndType title="Break" icon={EndBreakRight2Icon}/>

				<ButtonEndType title="Break" icon={EndBreakLeftIcon}/>
				<ButtonEndType title="Break" icon={EndBreakRightIcon}/>
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
