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
}
const PreviewFlashing: React.FC<Props> = ({ imgPreview}) => {
	const modalBottomRef = React.useRef<ModalBottomRef>();

	return (
		<>
			<TouchableOpacity onPress={() => modalBottomRef.current?.show()}>
				{imgPreview && <Image resizeMode="stretch" source={{ uri: imgPreview }} width={120} height={92} />}
			</TouchableOpacity>

			<ModalBottom
				backdropClosesSheet={true}
				ref={modalBottomRef}
				height={600}
				draggable={false}
			>
				<Box backgroundColor="white">
					{<Image resizeMode="contain" source={{ uri: imgPreview }} width={Dimensions.get("screen").width} height={600} />}
				</Box>
			</ModalBottom>
		</>
	)
}

export default PreviewFlashing
