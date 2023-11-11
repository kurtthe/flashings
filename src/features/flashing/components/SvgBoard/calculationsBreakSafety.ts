import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE, TYPE_END_LINES } from "@models";
import { isNaN } from "lodash";
import { createEquationOfLine } from "@features/flashing/utils";

const anglesEachType = {
	default: 45,
	horizontal: {
		x2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 140,
			['break2End' as TYPE_END_LINES]: 210,
			['break1Start' as TYPE_END_LINES]: 40,
			['break1End' as TYPE_END_LINES]: 320
		},
		x2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 40,
			['break2End' as TYPE_END_LINES]: 320,
			['break1Start' as TYPE_END_LINES]: 140,
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
			['break2Start' as TYPE_END_LINES]: 40,
			['break2End' as TYPE_END_LINES]: 140,
			['break1Start' as TYPE_END_LINES]: 240,
			['break1End' as TYPE_END_LINES]: 310
		}
	},
	pendingPositive: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 80,
			['break2End' as TYPE_END_LINES]: 210,
			['break1Start' as TYPE_END_LINES]: 190,
			['break1End' as TYPE_END_LINES]: 310
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 20,
			['break2End' as TYPE_END_LINES]: 310,
			['break1Start' as TYPE_END_LINES]: 140,
			['break1End' as TYPE_END_LINES]: 210
		}
	},
	pendingNegative: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 90,
			['break2End' as TYPE_END_LINES]: 180,
			['break1Start' as TYPE_END_LINES]: 170,
			['break1End' as TYPE_END_LINES]: 260
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 160,
			['break2End' as TYPE_END_LINES]: 260,
			['break1Start' as TYPE_END_LINES]: 30,
			['break1End' as TYPE_END_LINES]: 80
		}
	}
}
export const calculateTypeLine = ({points, angle}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const sizeLine = 20;
	const x1: number = points[0];
	const y1: number = points[1];

	if(isNaN(angle)){
		return [[x1,y1], [x1,y1]]
	}

	const eqOfLine = createEquationOfLine({points: [points], angle: angle})
	const paramB = parseFloat(eqOfLine.split('x')[1])
	const paramM = eqOfLine.split('x')[0]
	const valueBForEquation = `${paramB < 0? '+': '-'}${paramB}`

	console.log("eqOfLine::",eqOfLine)
	console.log("angle::",angle)
	const y2 = y1 + sizeLine * Math.cos(angle)
	console.log("y2::",y2)
	const resultX = `(${y2}${valueBForEquation})/${paramM}`
	console.log("resultX::",resultX)
	const x2 = eval(resultX)
	console.log("x2::",x2)

	return [[x1,y1], [x2,y2]]
}

export const calculatePointsParabola = (dataLine:LINE_TYPE,  endPoints= false )=> {
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

	// console.log("=============================::===================")
	// console.log("endPoints::", endPoints)
	// console.log("isHorizontal::", isHorizontal)
	// console.log("isVertical::", isVertical)
	// console.log("pending::", pending)

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
		// console.log("Pending positive::")
		// console.log("pointY1 > pointY2::",pointY1 > pointY2)
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

// console.log("default ::")
	return {
		points: [[currentPointX - radiusEllipseX, currentPointY+ 5]],
		radius: {
			x: radiusEllipseY,
			y: radiusEllipseX
		},
		rotation: pending
	}
}

export const getAngleForTheLine = (line:LINE_TYPE, typeLine: TYPE_END_LINES) => {
	const {points, pending} = line
	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	if (isHorizontal) {
		const dataHorizontal = anglesEachType.horizontal;
		return pointX2 > pointX1
			? dataHorizontal.x2major[typeLine]
			: dataHorizontal.x2minus[typeLine]
	}

	if (isVertical) {
		const dataVertical = anglesEachType.vertical;
		return pointY1 > pointY2
			? dataVertical.y2minus[typeLine]
			: dataVertical.y2major[typeLine]
	}

	if (pending > 0) {
		const dataPendingPositive = anglesEachType.pendingPositive;
		return pointY1 > pointY2
			? dataPendingPositive.y2minus[typeLine]
			: dataPendingPositive.y2major[typeLine]
	}

	if (pending < 0) {
		const dataPendingNegative = anglesEachType.pendingNegative;
		return pointY1 > pointY2
			? dataPendingNegative.y2minus[typeLine]
			: dataPendingNegative.y2major[typeLine]
	}

	return anglesEachType.default
}



