import { LINE_TYPE } from "@models";
import { parse, Path } from "react-native-redash";
import * as shape from "d3-shape";
import { scaleLinear } from 'd3-scale';

const LINE_OFFSET = 20;
export const buildLinesForPreview = (lines:LINE_TYPE[], width: number, height: number): Path | null => {
	if(!lines.length || lines[0].points.length <= 1) {
		return null;
	}
	const points = lines.map(line => line.points)
	return buildPathLineScale(points.flat(1), width, height)
}

export const buildPathLineScale = (points: LINE_TYPE['points'], width: number, height:number) => {
	const allPossibleValues = points.flat()

	const minValue = Math.min(...allPossibleValues) || 0;
	const maxValue = Math.max(...allPossibleValues) || 0;
	const scaleX = scalerX({width, minDomain:minValue, maxDomain: maxValue})

	return parse(shape
		.line()
		.x(data => scaleX(data[0]))
		.y(data => data[1] -height)
		.curve(shape.curveLinear)(points) as string)
};

 const scalerX = ({ width, minDomain, maxDomain }: { width: number; minDomain: number; maxDomain: number }) =>
	scaleLinear()
		.domain([minDomain, maxDomain])
		.range([LINE_OFFSET, width - LINE_OFFSET]);
