import React from 'react';
import { Box, Text } from "@ui/components";
import { Image } from "react-native";

type Props = {
	title?: string;
}
const Loading: React.FC<Props> = ({title}) => {
	return (
		<Box flex={1} alignItems="center" justifyContent="center" backgroundColor="white">
			<Box mb="2xl" alignItems="center">
				<Image source={require("@assets/images/loading.gif")}  />
				{title && <Text textAlign="center" mt="4xl" variant="subheadBold">{title}</Text>}
			</Box>
		</Box>
	)
}

export default Loading;
