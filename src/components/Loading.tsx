import React from 'react';
import Lottie from "@components/Lottie";
import { Box } from "@ui/components";
import { lotties } from "@assets/lotties";
import { Text } from "react-native";

type Props = {
	title?: string;
}
const Loading: React.FC<Props> = ({title}) => {
	return (
		<Box flex={1}>
			<Lottie source={lotties.loading} autoPlay loop />
			{title && <Text>{title}</Text>}
		</Box>
	)
}

export default Loading;
