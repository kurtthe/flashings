import { LINE_TYPE } from "@models";
import { buildPathLineParallel } from "@features/flashing/utils";
import { Path } from "react-native-redash";

export const buildLinesForPreview = (lines:LINE_TYPE[]): Path | null => {
	if(!lines.length || lines[0].points.length <= 1) {
		return null;
	}

	const points = lines.map(line => line.points)
	return buildPathLineParallel(points)
}
