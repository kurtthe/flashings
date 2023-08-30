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
		const makingLines = buildLinesForPreview(dataLines);
		setPathLines(makingLines)
	}, [dataLines]);

	return (
		<Box mt="s" width={width} height={height} backgroundColor="primary">
			<Svg width={width} height={height}>
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
