import React from 'react';
import { Box, Button } from "@ui/components";


type Props = {
	onPreview: () => void;
	onAddFlashing: () => void;
}
const SectionsButtonsJobsDetails: React.FC<Props>= ({onPreview, onAddFlashing}) => {
	return (
		<>
			<Box mx="m" mb="s" >
				<Button
					variant="outlineWhite"
					mt="l"
					onPress={onAddFlashing}>
					+ Add Flashing
				</Button>
			</Box>
			<Box mx="m" mb="xl" >
				<Button
					variant="solid"
					onPress={onPreview}>
					Preview
				</Button>
			</Box>
		</>
	)
}

export default  SectionsButtonsJobsDetails
