import React from 'react';
import Pdf from "react-native-pdf";
import { Button, Icon, IconButton } from "@ui/components";
import Share from "react-native-share";
import { ShareIcon } from "@assets/icons";
import { isAndroid } from "@shared/platform";

type Props = {
	urlIdPdf: string;
	namePdf: string;
	shareSmall?: boolean;
}
const PDFShared: React.FC<Props> = ({namePdf, urlIdPdf, shareSmall}) => {
	const [urlPdfLocal, setUrlPdfLocal] = React.useState<string>();
	const handleShare = ()=> {
		Share.open({
			title: "Share PDF flashing",
			url: isAndroid? urlIdPdf: urlPdfLocal,
			type: 'pdf',
			filename: `${namePdf}.pdf`,
			showAppsToView: true,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				err && console.log(err);
			});
	}

	return (
		<>
			{shareSmall && <IconButton style={{marginBottom: 20}} onPress={handleShare} icon={<Icon as={ShareIcon} color="black" size={35}/>} />}
			<Pdf
				trustAllCerts={false}
				minScale={1.5}
				maxScale={3}
				source={{
					uri: urlIdPdf,
					cache: true,
				}}
				style={{
					flex:0.95,
				}}
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
			{!shareSmall && <Button
				onPress={handleShare}
				variant="outlineWhite"
				borderRadius="unset"
				mb="m"
			>Share</Button>}
		</>
	)
}

export default PDFShared;
