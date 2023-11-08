import React from 'react';
import Svg, { Path as PathComponent } from "react-native-svg";
import { FLASHINGS_DATA } from "@models";
import { buildLinesForPreview } from "@features/flashing/components/PreviewFlashing/utils";
import { Path, serialize } from "react-native-redash";
import { Box } from "@ui/components";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { ModalBottom, ModalBottomRef } from '@components';
import { BoardComponent } from "@features/flashing/components";
import { calculateAngle, getIndexOfStepForName } from "@features/flashing/utils";

type Props = {
	width?: number;
	height?: number;
	imgPreview: string | undefined;
	dataFlashing: FLASHINGS_DATA;
}
const PreviewFlashing: React.FC<Props> = ({ imgPreview, dataFlashing,width=120, height=92,}) => {
	const [pathLines, setPathLines ] = React.useState<Path | null>(null)
	const [anglesLines, setAnglesLines] = React.useState<number[]>([]);
	const modalBottomRef = React.useRef<ModalBottomRef>();

	React.useEffect(() => {
		const makingLines = buildLinesForPreview(dataFlashing.dataLines, width, height);
		setPathLines(makingLines)
	}, [dataFlashing.dataLines]);

	React.useEffect(()=>{

		if(dataFlashing.dataLines.length < 2) return

		const newAngles = dataFlashing.dataLines.map((line, index, arrayLines)=> {
			if(!anglesLines[index]){
				return calculateAngle(line, arrayLines[index + 1])?? 0
			}
			return anglesLines[index]
		})
		setAnglesLines(newAngles)
	}, [dataFlashing.dataLines])

	return (
		<>
			<TouchableOpacity onPress={() => modalBottomRef.current?.show()}>
				{imgPreview && <Image resizeMode="stretch" source={{ uri: imgPreview }} width={120} height={92} />}
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
						angles={anglesLines}
						stepBoard={getIndexOfStepForName('preview')}
					/>
				</Box>
			</ModalBottom>
		</>
	)
}

export default PreviewFlashing
