import React from 'react';
import { Box, Text } from "@ui/components";
import { Image } from "react-native";

type Props = {
	title?: string;
}
const Loading: React.FC<Props> = ({title}) => {
	return (
		<Box flex={0.9} alignItems="center" justifyContent="center" backgroundColor="white">
			<Image source={require("@assets/images/loading.gif")}  />
			{title && <Text mt="4xl" variant="subheadBold">{title}</Text>}
		</Box>
	)
}

export default Loading;
