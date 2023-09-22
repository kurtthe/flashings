import React from 'react';
import {Modal} from "react-native"
import { Box, Text, Button, Input, BaseTouchable } from "@ui/components";
import { useAppDispatch } from "@hooks/useStore";
import { actions as flashingActions } from "@store/jobs/actions";
type Props = {
	visible: boolean;
	onClose?: () => void;
	jobId: number;
	idFlashing: number;
}
const ModalAddLengths: React.FC<Props> = ({visible, idFlashing, jobId, onClose}) => {
	const dispatch = useAppDispatch();

	const [qty, setQty]= React.useState("")
	const [length, setLength]= React.useState("")

	const isValid = () => {
		return qty.length === 0 || length.length === 0
	}

	const handleAddLength = () => {
		dispatch(flashingActions.addLengthJob({idJob: jobId, dataLength: {
			qty: parseInt(qty), length: parseInt(length)
			}, idFlashing:idFlashing }));
		onClose && onClose()
		setQty("")
		setLength("")
	}

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
						isDisabled={isValid()}
						onPress={() => handleAddLength()}>
						Save Flashing
					</Button>
				</Box>
			</Box>
		</Modal>
	)

}
export default ModalAddLengths
