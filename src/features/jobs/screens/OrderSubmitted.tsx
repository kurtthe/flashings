import React from 'react';
import { Box, Icon } from "@ui/components";
import { OrderSubmittedIcon } from "@assets/icons";
import { Image } from "react-native";
import { images } from "@assets/images";


const OrderSubmittedScreen = () => {

	return (
		<Box>
			<Box>
				<Image source={images.mainLogo} />
			</Box>
			<Icon as={OrderSubmittedIcon} size={30} />
		</Box>
	)
}

export default OrderSubmittedScreen
