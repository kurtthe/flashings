import React from 'react';
import Svg, { Path as PathComponent } from "react-native-svg";
import { LINE_TYPE } from "@models";
import { buildLinesForPreview } from "@features/flashing/components/PreviewFlashing/utils";
import { Path, serialize } from "react-native-redash";
import { Box } from "@ui/components";

type Props = {
	width: number;
	height: number;
	dataLines: LINE_TYPE[];
}
const PreviewFlashing: React.FC<Props> = ({width,height, dataLines}) => {
	const [pathLines, setPathLines ] = React.useState<Path | null>(null)

	React.useEffect(() => {
		const makingLines = buildLinesForPreview(dataLines, width, height);
		setPathLines(makingLines)
	}, [dataLines]);

	return (
		<Box width={width} height={height} backgroundColor="primary" >
			<Svg width={width - 5} height={height - 5} style={{backgroundColor: 'red'}}>
				{pathLines && <PathComponent
					d={serialize(pathLines)}
					stroke={"#000"}
					strokeWidth={1}
					fill="transparent"
				/>}
			</Svg>
		</Box>
	)
}

export default PreviewFlashing
