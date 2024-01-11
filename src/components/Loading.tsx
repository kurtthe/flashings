import React from 'react';
import { Box, Text } from "@ui/components";
import { lotties } from "@assets/lotties";
import LottieView from 'lottie-react-native';

type Props = {
	title?: string;
}
const Loading: React.FC<Props> = ({title}) => {
	return (
		<Box flex={1} alignItems="center" justifyContent="center" backgroundColor="white">
			<Box mb="6xl" alignItems="center">
				<LottieView source={lotties.loading} autoPlay loop style={{ width: 300, height: 300}}  />
				{title && <Text textAlign="center"  variant="subheadBold">{title}</Text>}
			</Box>
		</Box>
	)
}

export default Loading;
