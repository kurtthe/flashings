import React from 'react';
import { Box, Button, OptionsType, SelectInput, Text } from "@ui/components";
import Pdf from 'react-native-pdf';
import { StyleSheet } from "react-native";
import { useGetStores } from "@hooks/jobs";
import { storesToOption } from "@features/jobs/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJob } from "@features/jobs/navigation/routes";

type Props = {
	urlPdf: string;
}
const OrderSummaryScreen: React.FC<Props> = ({urlPdf}) => {
	const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([])
	const {data: stores, refetch } = useGetStores();
	const navigation = useNavigation<JobStackProps>()
	const route = useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>()

	const source = {
		uri: 'https://files-staging.paperplane.app/0bfb57d0-3700-4792-bf84-3ebfa66c5c3c.pdf',
		cache: true,
	};

	React.useEffect(()=> {
		if(!stores) {
			refetch().catch((error)=> console.log("error::", error));
			return;
		}

		const storesAsRadioButton = storesToOption(stores)
		setOptionsStore(storesAsRadioButton)
	}, [stores])
	const handleChange = ()=> null

	console.log("route.params.responseApi::",route.params.responseApi)

	return (
	<Box p="m" style={styles.container}>
		<Pdf
			minScale={1.5}
			maxScale={2}
			source={source}
			style={styles.pdf}
			onLoadComplete={(numberOfPages,filePath) => {
				console.log(`Number of pages: ${numberOfPages}`);
			}}
			onPageChanged={(page,numberOfPages) => {
				console.log(`Current page: ${page}`);
			}}
			onError={(error) => {
				console.log(error);
			}}
			onPressLink={(uri) => {
				console.log(`Link pressed: ${uri}`);
			}}
		/>
		<Text>{route.params.responseApi}</Text>
		<Button
			variant="outlineWhite"
			borderRadius="unset"
			mb="m"
		>Share</Button>

		<SelectInput
			options={optionsStore}
			onChange={handleChange}
			label="Select a store"
		/>
		<Button
			isDisabled={!stores?.length}
			onPress={()=> navigation.navigate(RoutesJob.ORDER_SUBMITTED)}
			my="m"
			variant="solid"
		>Send to store</Button>
	</Box>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
	},
	pdf: {
		flex:0.8,
	}
});
export default OrderSummaryScreen
