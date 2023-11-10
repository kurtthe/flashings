import React from "react";
import { START_END_LINE_TYPE, TYPE_END_LINES } from "@models";
import { Path as PathComponent, Ellipse } from "react-native-svg";
import { buildPathLine, } from "@features/flashing/utils";
import { palette } from "@theme";
import {
	calculatePointsParabola,
	calculateTypeLine
} from "@features/flashing/components/SvgBoard/calculationsBreakSafety";

const anglesEachType = {
	horizontal: {
		x2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		},
		x2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		}
	},
	vertical: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		}
	},
	pendingPositive: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		}
	},
	pendingNegative: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 30,
			['break2End' as TYPE_END_LINES]: 240,
			['break1Start' as TYPE_END_LINES]: 130,
			['break1End' as TYPE_END_LINES]: 210
		}
	}

}

export const getEndStartTypeLine = ({typeStart, typeEnd,  lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const colorBg = palette.base300

	const isNoneStart = typeStart.includes('none')
	const isNoneEnd = typeEnd.includes('none')

	console.log("typeStart::", typeStart)
	const pointsStartPath = calculateTypeLine({ points: lineStart.points[0], angle: 45 })
	const pointsEndPath = calculateTypeLine({  points: lineEnd.points[1], angle: 45})

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	const {points: pointsStart, radius: radiusStart, rotation: rotationStart} = calculatePointsParabola(lineStart)
	const {points: pointsEnd, radius: radiusEnd, rotation: rotationEnd} = calculatePointsParabola(lineEnd, true)

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
							<Ellipse cx={pointsEnd[0][0]} cy={pointsEnd[0][1]} rx={radiusEnd.x} ry={radiusEnd.y} stroke="black" transform={`rotate(${rotationEnd} ${pointsEnd[0][0]} ${pointsEnd[0][1]})`} fill={colorBg}  />
						)
					}
				</>
			)}
		</>
	)
}
