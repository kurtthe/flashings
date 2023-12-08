import React from 'react';
import { Box, Button, OptionsType, SelectInput, Text } from "@ui/components";
import Pdf from 'react-native-pdf';
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { useGetStores } from "@hooks/jobs";
import { storesToOption } from "@features/jobs/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJob } from "@features/jobs/navigation/routes";
import { RESPONSE_CREATE_AND_FLASHING } from "@models";
import { downloadFile, getDownloadPermissionAndroid } from "@shared/utils";
import RNFetchBlob from "rn-fetch-blob";
import Alert from "@services/general-request/alert";

const OrderSummaryScreen: React.FC = () => {
	const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([])
	const {data: stores, refetch } = useGetStores();
	const navigation = useNavigation<JobStackProps>()
	const route = useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>()
	const [urlIdPdf, setUrlIdPdf] = React.useState<string>()
	const [urlPdfLocal, setUrlPdfLocal] = React.useState<string>()
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(()=>{
		const timeout = setTimeout(()=> setIsLoading(false), 10000)
		return ()=> {clearTimeout(timeout)}
	},  [isLoading])

	React.useEffect(()=> {
		if(isLoading) return;
		const parseJSON: RESPONSE_CREATE_AND_FLASHING = JSON.parse(route.params.responseApi)
		const fileName = parseJSON.response.file_name
		setUrlIdPdf(`https://files-staging.paperplane.app/${fileName}`)
	}, [route.params.responseApi, isLoading])

	React.useEffect(()=> {
		if(!urlIdPdf) return

		(async ()=> {
			if (Platform.OS === 'android') {
				const setPermission = await getDownloadPermissionAndroid()
				if(setPermission){
					await downloadFile(urlIdPdf, route.params.responseApi)
				}
			}else {
				await downloadFile(urlIdPdf, route.params.responseApi)
			}
		})()
	}, [urlIdPdf, route.params.responseApi])

	React.useEffect(()=> {
		if(!stores) {
			refetch().catch((error)=> console.log("error::", error));
			return;
		}

		const storesAsRadioButton = storesToOption(stores)
		setOptionsStore(storesAsRadioButton)
	}, [stores])
	const handleChange = ()=> null

	console.log("urlIdPdf::", urlIdPdf)

	const downloadFile = async (url: string, name: string) => {
		const responseFile = await downloadFile(url, name)
		console.log("responseFile::", responseFile)
	}

	if(!urlIdPdf || isLoading){
		return (
			<Box flex={1} alignItems="center" justifyContent="center">
				<ActivityIndicator/>
			</Box>
		);
	}


	return (
	<Box p="m" style={styles.container}>
		<Pdf
			minScale={1.5}
			maxScale={3}
			source={{
				uri: urlIdPdf,
			}}
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
		flex:0.95,
	}
});
export default OrderSummaryScreen
