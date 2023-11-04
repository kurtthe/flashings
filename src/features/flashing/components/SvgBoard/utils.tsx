import React from "react";
import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE } from "@models";
import { Path as PathComponent, Ellipse } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";
import { palette } from "@theme";

const calculateTypeLine = ({start=true, type, line, isRight=true}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const sizeLine = 20;
	let anglesRight = start? 40: 60;
	let anglesLeft = start? 5: 20;

	if(type.includes('1')){
		anglesRight = start? 80: 40;
		anglesLeft = start? 20: 30;
	}

	if(type.includes('safety')){
		anglesRight = 120;
		anglesLeft = 90;
	}
	const angle=  isRight ?anglesRight: anglesLeft ;
	const x1 = start? line.points[0][0]: line.points[1][0];
	const y1 = start? line.points[0][1]: line.points[1][1];

	const x2 = x1 + sizeLine * Math.cos(angle)
	const y2 = y1 + sizeLine * Math.sin(angle)
	return [[x1,y1], [x2,y2]]
}

const calculatePointsParabola = (dataLine:LINE_TYPE, parallelRight= true )=> {
	const {points} = dataLine
	let radiusEllipseX = 4
	let radiusEllipseY = 10

	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	if(isHorizontal){
		if(pointX2 > pointX1){
			if(parallelRight){
				return {points: [[pointX1 + radiusEllipseX, pointY1 + radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
					}}
			}
			return {points:  [[pointX1 + radiusEllipseX, pointY1 - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				}}
		}
		if(parallelRight){
			return { points: [[pointX1, pointY1 - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX
				} }
		}
		return {
			points: [[pointX1, pointY1 + radiusEllipseX]],
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
					points: [[pointX1 - radiusEllipseX, pointY1 - radiusEllipseY]],
					radius: {
						x: radiusEllipseX,
						y: radiusEllipseY
					}
				}
			}
			return {
				points: [[pointX1 + radiusEllipseX, pointY1 - radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				}
			}
		}

		if(parallelRight){
			return {
				points: [[pointX1 - radiusEllipseX, pointY1 + radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY
				}
			}
		}
		return {
			points: [[pointX1 + radiusEllipseX, pointY1 + radiusEllipseY]],
			radius: {
				x: radiusEllipseX,
				y: radiusEllipseY
			}
		}
	}

	return {
		points: [[pointX1, pointY1]],
		radius: {
			x: radiusEllipseX,
			y: radiusEllipseY
		}
	}
}

export const getEndStartTypeLine = ({typeStart, typeEnd, isRightBlueLine, lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const colorBg = palette.base300

	const pointsStartPath = calculateTypeLine({ type: typeStart, line: lineStart, start:true, isRight: isRightBlueLine })
	const pointsEndPath = calculateTypeLine({ type: typeEnd, line: lineEnd, start:false, isRight: isRightBlueLine })

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	const isStartLine = typeStart.includes('Start')
	const isEndLine = typeEnd.includes('End')

	const {points: pointsStart, radius: radiusStart} = calculatePointsParabola(lineStart, isStartLine)
	const {points: pointsEnd, radius: radiusEnd} = calculatePointsParabola(lineEnd, isEndLine)

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
					<Ellipse cx={pointsEnd[0][0]} cy={pointsEnd[0][1]} rx={radiusEnd.x} ry={radiusEnd.y} stroke="black" fill="black" />
				)
			}
		</>
	)
}
