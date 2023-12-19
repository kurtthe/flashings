import React from 'react';
import { Box, Button, OptionsType, SelectInput } from "@ui/components";
import Pdf from 'react-native-pdf';
import { StyleSheet } from "react-native";
import { useCreateMaterial, useGetStores, useGetSupplier, useSendToStore } from "@hooks/jobs";
import { buildDataMaterialOrder, storesToOption } from "@features/jobs/utils";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { JobsStackParamsList, JobStackProps } from "@features/jobs/navigation/Stack.types";
import { Routes as RoutesJob } from "@features/jobs/navigation/routes";
import { ORDER_TYPE_STORE, RESPONSE_CREATE_AND_FLASHING, RESPONSE_MATERIAL_ORDER, STORE } from "@models";
import Share from 'react-native-share';
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { formatDate } from "@shared/utils/formatDate";
import { dataUserSelector } from "@store/auth/selectors";
import { actions as jobActions } from "@store/jobs/actions";
import { baseUrlPDF } from "@shared/endPoints";
import Loading from "@components/Loading";

const OrderSummaryScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const dataUser = useAppSelector(dataUserSelector);

	const navigation = useNavigation<JobStackProps>()
	const route = useRoute<RouteProp<JobsStackParamsList, RoutesJob.ORDER_SUMMARY>>()

	const [optionsStore, setOptionsStore] = React.useState<OptionsType[]>([])
	const [urlIdPdf, setUrlIdPdf] = React.useState<string>()
	const [urlPdfLocal, setUrlPdfLocal] = React.useState<string>()
	const [isLoading, setIsLoading] = React.useState(true);
	const [idOfOrder, setIdOfOrder] = React.useState<number | undefined>()
	const [storeSelected, setStoreSelected] = React.useState<STORE | undefined>()

	const {data: stores, refetch } = useGetStores();
	const {data: dataSupplier, isLoading: loadingSupplier} = useGetSupplier()

	const {mutate: doMaterialOrder}= useCreateMaterial({onSuccess: (data)=> {
			if(!storeSelected) return;
			const jobId = route.params.jobId;
			const orderNumber = (data as RESPONSE_MATERIAL_ORDER).order.order_number
			const orderId = (data as RESPONSE_MATERIAL_ORDER).order.id

			const dataOrder:ORDER_TYPE_STORE ={
				orderNumber: `${orderNumber}`.trim(),
				urlPdf: urlIdPdf ?? '',
				store: storeSelected.name,
				date: formatDate(new Date(), "YYYY-MM-DD HH:mm:ss")
			}

			dispatch(jobActions.orderSent({idJob: jobId, dataOrder }));
			setIdOfOrder(orderId)
		}})
	const { mutate: sharedMaterialOrder, isLoading: loadingSharedMaterial, } = useSendToStore({
		onSuccess: () => {
			const jobId = route.params.jobId;
			navigation.navigate(RoutesJob.ORDER_SUBMITTED, {jobId})
		},
	});


	React.useEffect(()=>{
		const timeout = setTimeout(()=> setIsLoading(false), 20000)
		return ()=> {clearTimeout(timeout)}
	},  [isLoading])

	React.useEffect(()=> {
		if(isLoading) return;
		const parseJSON: RESPONSE_CREATE_AND_FLASHING = JSON.parse(route.params.responseApi)
		const fileName = parseJSON.response.file_name
		setUrlIdPdf(`${baseUrlPDF}${fileName}`)
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
		if(!urlIdPdf) return
		const delayCreateMaterialOrder = setTimeout(() => handleCreateMaterialOrder(), 2000)
		return ()=> {
			clearTimeout(delayCreateMaterialOrder)
		}
	}, [urlIdPdf])

	const handleChange = (itemStore: OptionsType)=> {
		const dataStore = stores?.find((sItemStore)=> itemStore.value === sItemStore.id)
		if(!dataStore) return
		setStoreSelected(dataStore)
	}
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
			}],

		})
		doMaterialOrder({material: dataMaterial})
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

	const handleSendToStore = ()=> {
		if (!storeSelected || !dataUser || !idOfOrder) return
		sharedMaterialOrder({
			dataShared: {
				emails: [
					storeSelected.email,
					`${dataUser.email}`,
					"burdens.orders@tradetrak.com.au",
					"matt.celima@burdens.com.au",
					"owenm@trak.co",
					"markm@trak.co",
					"mat@digitalbasis.com.au",
					"jeff@digitalbasis.com"
				],
				message: 'Thanks for your Flashings order - it has been received by our team for review and processing. An email notification will be sent to the account owner when it has been processed by the store. Please contact us at 03 9703 8400. Thank you, the Burdens Flashing App Team.',
				idOrder: idOfOrder
			}
		})
	}

	if(!urlIdPdf || isLoading || loadingSupplier){
		return (
			<Loading title="Creating your Flashing Drawing" />
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
			isLoading={loadingSharedMaterial}
			isDisabled={!stores?.length || !storeSelected || !idOfOrder}
			onPress={()=> handleSendToStore() }
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
