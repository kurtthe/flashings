import React from "react";
import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE, TYPE_END_LINES } from "@models";
import { Path as PathComponent, Ellipse } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";
import { palette } from "@theme";

const calculateTypeLine = ({points, angle}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const sizeLine = 20;
	const x1: number = points[0];
	const y1: number = points[1];

	const x2 = x1 + sizeLine * Math.sin(angle)
	const y2 = y1 + sizeLine * Math.cos(angle)
	return [[x1,y1], [x2,y2]]
}

const calculatePointsParabola = (dataLine:LINE_TYPE,  endPoints= false )=> {
	const {points, pending} = dataLine
	let radiusEllipseX = 4
	let radiusEllipseY = 10

	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const currentPointX = endPoints? pointX2: pointX1
	const currentPointY = endPoints? pointY2: pointY1

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	console.log("=============================::===================")
	console.log("endPoints::", endPoints)
	console.log("isHorizontal::", isHorizontal)
	console.log("isVertical::", isVertical)
	console.log("pending::", pending)

	if(isHorizontal){
		if(pointX2 > pointX1){
			return {points:  [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				},rotation: pending
			}
		}
		return {
			points: [[currentPointX, currentPointY + radiusEllipseX]],
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
			},
			rotation: pending
		}
	}
// vertical
	if(isVertical){
		if(pointY1 > pointY2){
			return {
				points: [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				},
				rotation: pending
			}
		}

		return {
			points: [[currentPointX + radiusEllipseX, currentPointY + radiusEllipseY]],
			radius: {
				x: radiusEllipseX,
				y: radiusEllipseY
			},
			rotation: pending
		}
	}
	// pending positive
	if (pending > 0) {
		console.log("Pending positive::")
		console.log("pointY1 > pointY2::",pointY1 > pointY2)
		if(pointY1 > pointY2){
			return {
				points: [[currentPointX, currentPointY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				},
				rotation: pending
			}
		}
	}
//pending negative
	if (pending < 0) {
		if(pointY1 > pointY2){
			return {
				points: [[currentPointX - 5, currentPointY - radiusEllipseX]],
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				},
				rotation: pending
			}
		}
	}

console.log("default ::")
	return {
		points: [[currentPointX - radiusEllipseX, currentPointY+ 5]],
		radius: {
			x: radiusEllipseY,
			y: radiusEllipseX
		},
		rotation: pending
	}
}

const anglesEachType = {
	['break2Start' as TYPE_END_LINES]: 5,
	['break2End' as TYPE_END_LINES]: 230,
	['break1Start' as TYPE_END_LINES]: 240,
	['break1End' as TYPE_END_LINES]: 310
}

export const getEndStartTypeLine = ({typeStart, typeEnd,  lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const colorBg = palette.base300

	const isNoneStart = typeStart.includes('none')
	const isNoneEnd = typeEnd.includes('none')


	const pointsStartPath = calculateTypeLine({ points: lineStart.points[0], angle: anglesEachType[typeStart] })
	const pointsEndPath = calculateTypeLine({  points: lineEnd.points[1], angle: anglesEachType[typeEnd]})

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
