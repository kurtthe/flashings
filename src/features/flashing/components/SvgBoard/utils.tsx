import React from "react";
import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE } from "@models";
import { Path as PathComponent, Ellipse } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";
import { palette } from "@theme";

const calculateTypeLine = ({type, points}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const sizeLine = 20;
	let angle = 20;
	let x1: number = points[0];
	let y1: number = points[1];

	if(type.includes('Start')){
		angle = type.includes('1')? 120 : 60;
	}

	if(type.includes('End')){
		angle = type.includes('1')? -120 : 90;
	}

	const x2 = x1 + sizeLine * Math.cos(angle)
	const y2 = y1 + sizeLine * Math.sin(angle)
	return [[x1,y1], [x2,y2]]
}

const calculatePointsParabola = (dataLine:LINE_TYPE, parallelRight= true, endPoints= false )=> {
	const {points, pending} = dataLine
	let radiusEllipseX = 4
	let radiusEllipseY = 10

	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const currentPointX = endPoints?pointX2 :pointX1
	const currentPointY = endPoints?pointY2: pointY1

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	if(isHorizontal){
		if(pointX2 > pointX1){
			if(parallelRight){
				return {points: [[currentPointX + radiusEllipseX, currentPointY + radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
					}}
			}
			return {points:  [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				}}
		}
		if(parallelRight){
			return { points: [[currentPointX, currentPointY - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				} }
		}
		return {
			points: [[currentPointX, currentPointY + radiusEllipseX]],
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX
			}
		}
	}
// vertical
	if(isVertical){
		if(pointY1 > pointY2){
			if(parallelRight){
				return {
					points: [[currentPointX - radiusEllipseX, currentPointY - radiusEllipseY]],
					radius: {
						x: radiusEllipseX,
						y: radiusEllipseY
					}
				}
			}
			return {
				points: [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				}
			}
		}

		if(parallelRight){
			return {
				points: [[currentPointX - radiusEllipseX, currentPointY + radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				}
			}
		}
		return {
			points: [[currentPointX + radiusEllipseX, currentPointY + radiusEllipseY]],
			radius: {
				x: radiusEllipseX,
				y: radiusEllipseY
			}
		}
	}
	// pending positive
	if (pending > 0) {
		if(pointY1 > pointY2){
			if(parallelRight){
				return {
					points: [[currentPointX, currentPointY]],
					radius: {
						x: radiusEllipseX,
						y: radiusEllipseY
					}
				}
			}
			return {
				points: [[currentPointX, currentPointY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				}
			}
		}
	}
//pending negative
	if (pending < 0) {
		if(pointY1 > pointY2){
			if(parallelRight){
				return {
					points: [[currentPointX, currentPointY + radiusEllipseX ]],
					radius: {
						x: radiusEllipseY,
						y: radiusEllipseX
					}
				}
			}
			return {
				points: [[currentPointX - 5, currentPointY - radiusEllipseX]],
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				}
			}
		}
	}
	return {
		points: [[currentPointX - radiusEllipseX, currentPointY+ 5]],
		radius: {
			x: radiusEllipseY,
			y: radiusEllipseX
		}
	}
}

export const getEndStartTypeLine = ({typeStart, typeEnd,  lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const colorBg = palette.base300

	const isStartLine = typeStart.includes('Start')
	const isEndLine = typeEnd.includes('End')

	const pointsStartPath = calculateTypeLine({ type: typeStart, points: lineStart.points[0], })
	const pointsEndPath = calculateTypeLine({ type: typeEnd, points: lineEnd.points[1]})

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	const {points: pointsStart, radius: radiusStart} = calculatePointsParabola(lineStart, isStartLine)
	const {points: pointsEnd, radius: radiusEnd} = calculatePointsParabola(lineEnd, isEndLine, true)

	return (
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
					<Ellipse cx={pointsStart[0][0]} cy={pointsStart[0][1]} rx={radiusStart.x} ry={radiusStart.y} stroke="black" fill={colorBg} />
				)
			}
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
					<Ellipse cx={pointsEnd[0][0]} cy={pointsEnd[0][1]} rx={radiusEnd.x} ry={radiusEnd.y} stroke="black" fill={colorBg} />
				)
			}
		</>
	)
}
