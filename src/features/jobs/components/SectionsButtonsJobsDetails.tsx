import React from 'react';
import { Box, Button } from "@ui/components";


type Props = {
	loadingPreview?: boolean;
	showPreview?: boolean;
	onPreview: () => void;
	onAddFlashing: () => void;
	disabledAddFlashing?: boolean
}
const SectionsButtonsJobsDetails: React.FC<Props>= ({ onPreview, onAddFlashing, disabledAddFlashing=false, loadingPreview=false, showPreview=true}) => {
	return (
		<>
			<Box mx="m" mb="s">
				<Button
					isDisabled={disabledAddFlashing}
					variant="outlineWhite"
					mt="l"
					onPress={onAddFlashing}>
					+ Add Flashing
				</Button>
			</Box>
			{showPreview && <Box mx="m" mb="xl">
				<Button
					isLoading={loadingPreview}
					variant="solid"
					onPress={onPreview}>
					Preview
				</Button>
			</Box>}
		</>
	)
}

export default  SectionsButtonsJobsDetails
