import React from 'react';
import { Box, Icon, Text, Button } from "@ui/components";
import { OrderSubmittedIcon } from "@assets/icons";
import { Image, StyleSheet } from "react-native";
import { images } from "@assets/images";
import { useNavigation } from "@react-navigation/native";
import { JobStackProps } from "@features/jobs/navigation/Stack.types";
import {Routes as RoutesJobs} from "@features/jobs/navigation/routes"

const OrderSubmittedScreen = () => {
	const navigation = useNavigation<JobStackProps>()

	return (
		<Box style={styles.container}>
			<Box mt="xl">
				<Image
					source={images.mainLogo}
					style={{
						width: 142,
						height: 74,
						resizeMode: 'contain',
					}}
				/>
				<Box px="m" height={550} alignItems="center" justifyContent="center">
					<Icon as={OrderSubmittedIcon} size={116} />
					<Text mb="s"  variant="subheadBold" fontWeight="400" textAlign="center">Order submitted MO1223123</Text>
					<Text mt="xs" variant="bodyRegular" color="textGray" textAlign="center">Thank you for your ordering, please wait  for a minute.</Text>
				</Box>
				<Button
					onPress={()=> navigation.navigate(RoutesJobs.ALL_JOBS)}
					variant="outline"
					borderWidth={0}
					borderRadius="s"
				>Create Another Flashing</Button>
			</Box>
		</Box>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		paddingTop: 45,
		paddingVertical: 35,
	}
})
export default OrderSubmittedScreen;