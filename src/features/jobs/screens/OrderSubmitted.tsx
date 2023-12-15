import React from 'react';
import { Box, Icon, Text, Button } from "@ui/components";
import { OrderSubmittedIcon } from "@assets/icons";
import { Image, StyleSheet } from "react-native";
import { images } from "@assets/images";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJob, Routes as RoutesJobs } from "@features/jobs/navigation/routes";
import { useAppSelector } from "@hooks/useStore";
import { getOrderNumber } from "@store/jobs/selectors";

const OrderSubmittedScreen = () => {
	const navigation = useNavigation<JobStackProps>()
	const route = useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUBMITTED>>()

	const orderNUmber = useAppSelector((state) => getOrderNumber(state, route.params.jobId));

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
					<Text mb="s"  variant="subheadBold" fontWeight="400" textAlign="center">Order submitted{"\n"} MO{orderNUmber}</Text>
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
