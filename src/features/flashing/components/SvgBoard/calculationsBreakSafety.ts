import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE, TYPE_END_LINES } from "@models";
import { isNaN } from "lodash";
import { createEquationOfLine } from "@features/flashing/utils";

const equationResultAzimuth = {
	'1': 'angle',
	'2': '180-angle',
	'3': '180+angle',
	'4': '360-angle'
}

const anglesEachType = {
	default: 45,
	horizontal: {
		x2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 120,
			['break2End' as TYPE_END_LINES]: 320,
			['break1Start' as TYPE_END_LINES]: 210,
			['break1End' as TYPE_END_LINES]: 340
		},
		x2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 150,
			['break2End' as TYPE_END_LINES]: 60,
			['break1Start' as TYPE_END_LINES]: 170,
			['break1End' as TYPE_END_LINES]: 320
		}
	},
	vertical: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 143,
			['break2End' as TYPE_END_LINES]: 150,
			['break1Start' as TYPE_END_LINES]: 345,
			['break1End' as TYPE_END_LINES]: 368
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 40,
			['break2End' as TYPE_END_LINES]: 315,
			['break1Start' as TYPE_END_LINES]: 145,
			['break1End' as TYPE_END_LINES]: 210
		}
	},
	pendingPositive: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 50,
			['break2End' as TYPE_END_LINES]: 180,
			['break1Start' as TYPE_END_LINES]: 30,
			['break1End' as TYPE_END_LINES]: 305
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 60,
			['break2End' as TYPE_END_LINES]: 360,
			['break1Start' as TYPE_END_LINES]: 140,
			['break1End' as TYPE_END_LINES]: 50
		}
	},
	pendingNegative: {
		y2major: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 150,
			['break2End' as TYPE_END_LINES]: 60,
			['break1Start' as TYPE_END_LINES]: 170,
			['break1End' as TYPE_END_LINES]: 40
		},
		y2minus: {
			['none']: NaN,
			['break2Start' as TYPE_END_LINES]: 50,
			['break2End' as TYPE_END_LINES]: 360,
			['break1Start' as TYPE_END_LINES]: 150,
			['break1End' as TYPE_END_LINES]: 305
		}
	}
}
export const calculateTypeLine = ({points, angle}: BREAK_END_START_LINE_TYPE): POINT_TYPE[]=> {
	const x1: number = points[0];
	const y1: number = points[1];
	// validando que el angulo exista
	if(isNaN(angle)){
		return [[x1,y1], [x1,y1]]
	}
	// se crea la ecuación de la linea recta con los puntos y el angulo,
	// con el angulo se halla la pendiente de la linea recta
	// ecaución = mx + b
	const eqOfLine = createEquationOfLine({points: [points], angle: angle})
	// sacando la pendiente de la ecuacion
	const paramM = eqOfLine.split('x')[0]
	// tamaño de la linea que se va a dibujar
	const sizeLine = (parseFloat(paramM) !== 0)? 10: 20;

	const paramB = parseFloat(eqOfLine.split('x')[1])
	//preparando b para la ecuación  para hallar el x
	const valueBForEquation = `${paramB < 0? '+': '-'}${paramB}`
	// hallando el y2 para la linea del break
	const y2 = y1 + sizeLine * Math.sin(angle)
	// hallando el x2 para la linea del break
	// x = y2-b/pending
	const resultX = `${y2}${valueBForEquation}/${paramM}`
	//resolviendo la ecuación
	const x2 = eval(resultX)
	return [[x1,y1], [x2,y2]]
}


export const calculatePointsParabola = (dataLine:LINE_TYPE,  typeLine : TYPE_END_LINES, endPoints= false )=> {
	const {points} = dataLine
	const pending = calculateAngle(dataLine)
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

const calculateAngle = (lineData: LINE_TYPE)=>{
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


