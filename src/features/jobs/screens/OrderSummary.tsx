import React from 'react';
import { Box, Button, OptionsType, SelectInput } from "@ui/components";
import Pdf from 'react-native-pdf';
import { ActivityIndicator,  StyleSheet } from "react-native";
import { useCreateMaterial, useGetStores, useGetSupplier } from "@hooks/jobs";
import { buildDataMaterialOrder, storesToOption } from "@features/jobs/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJob } from "@features/jobs/navigation/routes";
import { RESPONSE_CREATE_AND_FLASHING, RESPONSE_MATERIAL_ORDER } from "@models";
import Share from 'react-native-share';
import { useAppDispatch } from "@hooks/useStore";
import { actions as jobActions } from "@store/jobs/actions";
import { formatDate } from "@shared/utils/formatDate";

const OrderSummaryScreen: React.FC = () => {
	const dispatch = useAppDispatch();

	const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([])
	const [urlIdPdf, setUrlIdPdf] = React.useState<string>()
	const [urlPdfLocal, setUrlPdfLocal] = React.useState<string>()
	const [isLoading, setIsLoading] = React.useState(true);
	const [idOrder, setIdOrder] = React.useState<number | undefined>(undefined)

	const {data: stores, refetch } = useGetStores();
	const {data: dataSupplier} = useGetSupplier()

	const { mutate: createMaterialOrder, } = useCreateMaterial({
		onSuccess: (data) => {
			const orderNumber = (data as RESPONSE_MATERIAL_ORDER).order.order_number
			const orderId = (data as RESPONSE_MATERIAL_ORDER).order.id
			dispatch(jobActions.orderSent({idJob: route.params.jobId, orderNumber}))
			setIdOrder(orderId)
		},
	});

	const navigation = useNavigation<JobStackProps>()
	const route = useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>()

	React.useEffect(()=>{
		const timeout = setTimeout(()=> setIsLoading(false), 20000)
		return ()=> {clearTimeout(timeout)}
	},  [isLoading])

	React.useEffect(()=> {
		if(isLoading) return;
		const parseJSON: RESPONSE_CREATE_AND_FLASHING = JSON.parse(route.params.responseApi)
		const fileName = parseJSON.response.file_name
		setUrlIdPdf(`https://files-staging.paperplane.app/${fileName}`)
	}, [route.params.responseApi, isLoading])

	React.useEffect(()=> {
		if(!stores) {
			refetch().catch((error)=> console.log("error::", error));
			return;
		}

		const storesAsRadioButton = storesToOption(stores)
		setOptionsStore(storesAsRadioButton)
	}, [stores])

	React.useEffect(()=> {
		if(!dataSupplier || !urlIdPdf) return
		handleCreateMaterialOrder()
	}, [dataSupplier, urlIdPdf])
	const handleChange = ()=> null
	const handleCreateMaterialOrder = ()=> {
		if(!dataSupplier || !urlIdPdf) return

		const jobName = route.params.jobName
		const jobNumber = route.params.jobId
		const jobAddress = route.params.jobAddress

		const currentDate = formatDate(new Date())
		const dataMaterial = buildDataMaterialOrder({name: jobName,
			supplier: dataSupplier.id,
			issued_on: currentDate,
			description: `Job Name: ${jobName} - Job Number: ${jobNumber} - Job Address: ${jobAddress}`,
			attachments: [{
				name: `${jobName}.pdf`,
				link: urlIdPdf
			}]
			})
		createMaterialOrder({material: dataMaterial})
	}

	const handleShare = ()=> {
		Share.open({
			title: "Share PDF flashing",
			url: urlPdfLocal,
			type: 'pdf',
			filename: `${route.params.jobName}.pdf`,
			showAppsToView: true,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				err && console.log(err);
			});
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
			trustAllCerts={false}
			minScale={1.5}
			maxScale={3}
			source={{
				uri: urlIdPdf,
				cache: true,
			}}
			style={styles.pdf}
			onLoadComplete={(numberOfPages,filePath) => {
				console.log(`Number of pages: ${numberOfPages}`);
				setUrlPdfLocal(filePath)
			}}
			onError={(error) => {
				console.log(error);
			}}
			onPressLink={(uri) => {
				console.log(`Link pressed: ${uri}`);
			}}
		/>
		<Button
			onPress={handleShare}
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
			isDisabled={!stores?.length || !idOrder}
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
