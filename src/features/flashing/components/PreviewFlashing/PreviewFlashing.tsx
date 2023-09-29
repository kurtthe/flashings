import React from 'react';
import Svg, { Path as PathComponent } from "react-native-svg";
import { FLASHINGS_DATA } from "@models";
import { buildLinesForPreview } from "@features/flashing/components/PreviewFlashing/utils";
import { Path, serialize } from "react-native-redash";
import { Box } from "@ui/components";
import {TouchableOpacity}  from "react-native";
import { ModalBottom, ModalBottomRef } from '@components';
import { BoardComponent } from "@features/flashing/components";

type Props = {
	width: number;
	height: number;
	dataFlashing: FLASHINGS_DATA;
}
const PreviewFlashing: React.FC<Props> = ({width,height, dataFlashing}) => {
	const [pathLines, setPathLines ] = React.useState<Path | null>(null)
	const modalBottomRef = React.useRef<ModalBottomRef>();

	React.useEffect(() => {
		const makingLines = buildLinesForPreview(dataFlashing.dataLines, width, height);
		setPathLines(makingLines)
	}, [dataFlashing.dataLines]);

	return (
		<>
			<TouchableOpacity onPress={() => modalBottomRef.current?.show()}>
			<Box backgroundColor="white" width={width} height={height} px="s" mt="xs" borderWidth={1.5} borderColor="divider" borderRadius="m" alignItems="center" justifyContent="center"  >
				<Svg width={width/2} height={height - 10}>
					{pathLines && <PathComponent
						d={serialize(pathLines)}
						stroke={"#000"}
						strokeWidth={1}
						fill="transparent"
					/>}
				</Svg>
			</Box>
			</TouchableOpacity>

			<ModalBottom
				backdropClosesSheet={true}
				ref={modalBottomRef}
				height={500}
				draggable={false}
			>
				<Box style={{marginTop: -100}} backgroundColor="white">
					<BoardComponent
						rightLinePaint={dataFlashing.parallelRight}
						lines={dataFlashing.dataLines}
						mode="preview"
					/>
				</Box>
			</ModalBottom>
		</>
	)
}

export default PreviewFlashing
