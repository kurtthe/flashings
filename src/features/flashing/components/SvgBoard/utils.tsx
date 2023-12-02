import React from "react";
import { START_END_LINE_TYPE, TYPE_END_LINES_BREAK } from "@models";
import { Path as PathComponent } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";
import {
	calculateTypeLine, getAngleForTheLine
} from "@features/flashing/components/SvgBoard/calculationsBreakSafety";

export const getEndStartTypeLine = ({typeStart, typeEnd,  lineEnd, lineStart}:START_END_LINE_TYPE )=>{

	const isNoneStart = typeStart.includes('none')
	const isNoneEnd = typeEnd.includes('none')

	const angleStartLine = getAngleForTheLine(lineStart, typeStart as TYPE_END_LINES_BREAK)
	const angleEndLine = getAngleForTheLine(lineEnd, typeEnd as TYPE_END_LINES_BREAK)

	const pointsStartPath = calculateTypeLine({ points: lineStart.points[0], angle: angleStartLine })
	const pointsEndPath = calculateTypeLine({  points: lineEnd.points[1], angle: angleEndLine})

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	return (
		<>
			{isNoneStart ? null: (
					<PathComponent
						d={buildPathLine(pointsStartPath)}
						strokeWidth={isSafetyStart? 3: 1}
						stroke="#000"
						fill="none"
					/>
			)}

			{isNoneEnd? null : (
					<PathComponent
						d={buildPathLine(pointsEndPath)}
						strokeWidth={isSafetyEnd?3: 1}
						stroke="#000"
						fill="none"
					/>
			)}
		</>
	)
}
