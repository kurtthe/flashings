import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, TYPE_END_LINES, TYPE_END_LINES_BREAK } from "@models";
import { isNaN } from "lodash";
import anglesBreaks from'./anglesBreaks.json'
const equationResultAzimuth = {
	'1': 'angle',
	'2': '180-angle',
	'3': '180+angle',
	'4': '360-angle'
}

export const calculateTypeLine = ({points, angle}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const x1: number = points[0];
	const y1: number = points[1];
	const sizeLine = 20
	if(isNaN(angle)){
		return [[x1,y1], [x1,y1]]
	}
	const angleInRadians =  angle / 180 * Math.PI;
	const x2 = x1 + sizeLine * Math.cos(angleInRadians);
	const y2 = y1 + sizeLine * Math.sin(angleInRadians);

	return [[x1,y1], [x2,y2]]
}


export const calculatePointsParabola = (dataLine:LINE_TYPE,  typeLine : TYPE_END_LINES, endPoints= false )=> {
	const {points} = dataLine
	const pending = calculateAngleAzimut(dataLine)
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
	const isStartLine = typeLine.includes('Start')

	if(isHorizontal){
		if(pointX2 > pointX1){
			if(isStartLine){
				return {
					rotation: pending,
					points: [[currentPointX + radiusEllipseX, currentPointY + radiusEllipseX]], radius: {
						x: radiusEllipseY,
						y: radiusEllipseX,
					}}
			}
			return {
				rotation: pending,
				points:  [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}}
		}
		if(isStartLine){
			return {
				rotation: pending,
				points: [[currentPointX, currentPointY - radiusEllipseX]], radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				} }
		}
		return {
			points: [[currentPointX, currentPointY + radiusEllipseX]],
			rotation: pending,
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
			}
		}
	}
// vertical
	if(isVertical){
		if(pointY1 > pointY2){
			if(isStartLine){
				return {
					points: [[currentPointX - radiusEllipseX, currentPointY - radiusEllipseY]],
					rotation: pending,
					radius: {
						x: radiusEllipseX,
						y: radiusEllipseY,
					}
				}
			}
			return {
				points: [[currentPointX + radiusEllipseX, currentPointY - radiusEllipseY]],
				rotation: pending,
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY,
				}
			}
		}

		if(isStartLine){
			return {
				points: [[currentPointX - radiusEllipseX, currentPointY + radiusEllipseY]],
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY,
				},
				rotation: pending
			}
		}
		return {
			points: [[currentPointX + radiusEllipseX, currentPointY + radiusEllipseY]],
			rotation: pending,
			radius: {
				x: radiusEllipseX,
				y: radiusEllipseY,
			}
		}
	}
	if (pending > 0) {
		if(pointY1 > pointY2){
			if(isStartLine){
				return {
					points: [[currentPointX, currentPointY]],
					rotation: pending,
					radius: {
						x: radiusEllipseX,
						y: radiusEllipseY,
					}
				}
			}
			return {
				points: [[currentPointX, currentPointY]],
				rotation: pending,
				radius: {
					x: radiusEllipseX,
					y: radiusEllipseY,
				}
			}
		}

		if(isStartLine){
			return {
				points: [[currentPointX - radiusEllipseX, currentPointY]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}
		return {
			points: [[currentPointX + (radiusEllipseX * 3), currentPointY]],
			rotation: pending,
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
			}
		}

	}
//pending negative
	if (pending < 0) {
		if(pointY1 > pointY2){
			if(isStartLine){
				return {
					points: [[currentPointX -radiusEllipseX, currentPointY + radiusEllipseX ]],
					rotation: pending,
					radius: {
						x: radiusEllipseY,
						y: radiusEllipseX,
					}
				}
			}
			return {
				points: [[currentPointX - 5, currentPointY - radiusEllipseX]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}

		if(isStartLine){
			return {
				points: [[currentPointX - radiusEllipseX, currentPointY - 3]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}
		return {
			points: [[currentPointX, currentPointY + 5]],
			rotation: pending,
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
			}
		}
	}

	return {
		points: [[currentPointX - radiusEllipseX, currentPointY+ 5]],
		rotation: pending,
		radius: {
			x: radiusEllipseY,
			y: radiusEllipseX,
		}
	}
}

export const getAngleForTheLine = (line:LINE_TYPE, typeLine: TYPE_END_LINES_BREAK): number => {
	const angleAzimut = parseInt(calculateAngleAzimut(line))
	console.log("angleAzimut::",angleAzimut)

	const dataAngles =  anglesBreaks.find((angleB)=> angleB.default === angleAzimut.toString())

	return dataAngles ? parseInt(`${dataAngles.angles[typeLine]}`): NaN
}

export const calculateAngleAzimut = (lineData: LINE_TYPE)=>{
	const coordinatesM = lineData.points[0];
	const coordinatesN = lineData.points[1];

	const deltaN = coordinatesN[0] - coordinatesM[0];
	const deltaE = coordinatesN[1] - coordinatesM[1];

	const quadrant1 = deltaE > 0 && deltaN > 0 && '1'
	const quadrant2 = deltaE > 0 && deltaN < 0 && '2'
	const quadrant3 = deltaE < 0 && deltaN < 0 && '3'
	const quadrant4 = deltaE < 0 && deltaN > 0 && '4'

	const quadrant = quadrant1 ?? quadrant2 ?? quadrant3 ?? quadrant4

	const thetaAngle = Math.atan(deltaE/deltaN)
	const angleRadians = thetaAngle * (180 / Math.PI)

	const equationToResolve = equationResultAzimuth[!quadrant? '1': quadrant]
	const replaceValues = equationToResolve.replace('angle', `${angleRadians}`)
	return eval(replaceValues)
}


