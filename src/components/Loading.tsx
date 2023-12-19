import React from 'react';
import { Box, Text } from "@ui/components";
import { Image } from "react-native";

type Props = {
	title?: string;
}
const Loading: React.FC<Props> = ({title}) => {
	return (
		<Box flex={1} alignItems="center" justifyContent="center" backgroundColor="white">
			<Image source={require("@assets/images/loading-wheel.gif")} width={150} height={100}  />
			{title && <Text variant="subheadBold">{title}</Text>}
		</Box>
	)
}

export default Loading;
