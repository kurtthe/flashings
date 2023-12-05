import React from 'react';
import { Box, Button } from "@ui/components";
import Pdf from 'react-native-pdf';
import { StyleSheet } from "react-native";
import { useGetStores } from "@hooks/jobs";

type Props = {
	urlPdf: string;
}
const OrderSummaryScreen: React.FC<Props> = ({urlPdf}) => {
	const {data: stores } = useGetStores();

	const source = {
		uri: 'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf',
		cache: true,
	};

	return (
	<Box p="m" style={styles.container}>
		<Pdf
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
		<Button
			variant="solidWhite"
			borderRadius="unset"
			borderWidth={1}
			color="black"
			my="s"
		>Print</Button>
		<Button
			variant="solidWhite"
			borderRadius="unset"
			borderWidth={1}
			color="black"
		>Shared</Button>


		<Button
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
