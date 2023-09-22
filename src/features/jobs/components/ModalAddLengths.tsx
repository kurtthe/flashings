import React from 'react';
import {Modal} from "react-native"
import { Box, Text, Button, Input, BaseTouchable } from "@ui/components";
type Props = {
	visible: boolean;
	onClose?: () => void;
}
const ModalAddLengths: React.FC<Props> = ({visible, onClose}) => {
	const [qty, setQty]= React.useState("")
	const [length, setLength]= React.useState("")

	return (
		<Modal
			transparent
			animationType="fade"
			visible={visible}
			>
			<Box as={BaseTouchable} onPress={()=> onClose && onClose()} flex={1} justifyContent="center" alignItems="center" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
				<Box p="m" backgroundColor="white" borderRadius="s">
					<Text variant="bodyButtonBold">New Length</Text>
					<Box flexDirection="row"  paddingTop="l" justifyContent='space-between' mb="m">
						<Input
							label="Qty"
							onChangeText={(text) => setQty(text)}
							value={qty}
							style={{width: 150}}
							keyboardType="numeric"
							mr="s"
						/>
						<Input
							label="Length"
							onChangeText={(text) => setLength(text)}
							value={length}
							style={{width: 150}}
							keyboardType="numeric"
							suffix="mm"
						/>
					</Box>
					<Button
						onPress={() => null}>
						Save Flashing
					</Button>
				</Box>
			</Box>
		</Modal>
	)

}
export default ModalAddLengths
