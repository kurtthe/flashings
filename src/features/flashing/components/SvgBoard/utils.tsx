import React from "react";
import { START_END_LINE_TYPE, TYPE_END_LINES_BREAK } from "@models";
import { Path as PathComponent, Ellipse } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";
import { palette } from "@theme";
import {
	calculatePointsParabola,
	calculateTypeLine, getAngleForTheLine
} from "@features/flashing/components/SvgBoard/calculationsBreakSafety";



export const getEndStartTypeLine = ({typeStart, typeEnd,  lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const colorBg = palette.base300

	const isNoneStart = typeStart.includes('none')
	const isNoneEnd = typeEnd.includes('none')

	const angleStartLine = getAngleForTheLine(lineStart, typeStart as TYPE_END_LINES_BREAK)
	const angleEndLine = getAngleForTheLine(lineEnd, typeEnd as TYPE_END_LINES_BREAK)

	const pointsStartPath = calculateTypeLine({ points: lineStart.points[0], angle: angleStartLine })
	const pointsEndPath = calculateTypeLine({  points: lineEnd.points[1], angle: angleEndLine})

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	const {points: pointsStart, radius: radiusStart, rotation: rotationStart} = calculatePointsParabola(lineStart, typeStart)
	const {points: pointsEnd, radius: radiusEnd, rotation: rotationEnd} = calculatePointsParabola(lineEnd, typeEnd, true)

	return (
		<>
			{isNoneStart ? null: (
				<>
					{
						!isSafetyStart && (
							<PathComponent
								d={buildPathLine(pointsStartPath)}
								strokeWidth={1}
								stroke="#000"
								fill="none"
							/>
						)
					}
					{
						isSafetyStart && (
							<Ellipse cx={pointsStart[0][0]} cy={pointsStart[0][1]} rx={radiusStart.x} ry={radiusStart.y} stroke="black" fill={colorBg} transform={`rotate(${rotationStart} ${pointsStart[0][0]} ${pointsStart[0][1]})`} />
						)
					}
				</>
			)}

			{isNoneEnd? null : (
				<>
					{
						!isSafetyEnd && (
							<PathComponent
								d={buildPathLine(pointsEndPath)}
								strokeWidth={1}
								stroke="#000"
								fill="none"
							/>
						)
					}
					{
						isSafetyEnd && (
							<Ellipse cx={pointsEnd[0][0]} cy={pointsEnd[0][1]} rx={radiusEnd.x} ry={radiusEnd.y} stroke="black" fill={colorBg} transform={`rotate(${rotationEnd} ${pointsEnd[0][0]} ${pointsEnd[0][1]})`}  />
						)
					}
				</>
			)}
		</>
	)
}
