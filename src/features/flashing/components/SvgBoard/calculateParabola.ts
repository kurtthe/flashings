import { LINE_TYPE, TYPE_END_LINES } from "@models";
import { calculateAngleAzimut } from "@features/flashing/components/SvgBoard/calculationsBreakSafety";
import AnglesSafety from './anglesSafety.json'
export const calculatePointsParabola = (dataLine:LINE_TYPE,  typeLine : TYPE_END_LINES, endPoints= false )=> {
	const {points} = dataLine
	const pending = calculateAngleAzimut(dataLine).toFixed()
	let radiusEllipseX = 2
	let radiusEllipseY = 10

	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const currentPointX = endPoints? pointX2: pointX1
	const currentPointY = endPoints? pointY2: pointY1

	const isStartLine = typeLine.includes('Start')? 'right': 'default'
	const getDataForAngle = AnglesSafety.find((safeties)=> safeties.angle === pending)
	console.log("================================:: =================================")
	console.log("getDataForAngle::", getDataForAngle)
	console.log("angle azimut::", pending)

	console.log("endPoints::", endPoints)
	console.log("isStartLine:", isStartLine)

	if(!getDataForAngle){
		return {
			points: [[currentPointX - radiusEllipseX, currentPointY + 4]],
			rotation: pending,
			radius: {
				x: radiusEllipseX,
				y: radiusEllipseY,
			}
		}
	}
	const radiusX = getDataForAngle[isStartLine].points[0]
	const radiusY = getDataForAngle[isStartLine].points[1]

	if(isStartLine === 'default'){
		return {
			points: [[endPoints?currentPointX - radiusX :currentPointX + radiusX, endPoints? currentPointY - radiusY: currentPointY + radiusY]],
			rotation: pending,
			radius: {
				x: getDataForAngle[isStartLine].radius.x,
				y: getDataForAngle[isStartLine].radius.y,
			}
		}
	}

	return {
		points: [[endPoints?currentPointX + radiusX :currentPointX - radiusX, endPoints? currentPointY - radiusY: currentPointY + radiusY]],
		rotation: pending,
		radius: {
			x: getDataForAngle[isStartLine].radius.x,
			y: getDataForAngle[isStartLine].radius.y,
		}
	}
}
