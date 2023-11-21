import { LINE_TYPE, TYPE_END_LINES } from "@models";
import { calculateAngleAzimut } from "@features/flashing/components/SvgBoard/calculationsBreakSafety";

export const calculatePointsParabola = (dataLine:LINE_TYPE,  typeLine : TYPE_END_LINES, endPoints= false )=> {
	const {points} = dataLine
	const pending = calculateAngleAzimut(dataLine)
	let radiusEllipseX = 2
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
				points: [[currentPointX - radiusEllipseX, currentPointY ]],
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				},
				rotation: pending
			}
		}
		return {
			points: [[currentPointX + radiusEllipseX, currentPointY]],
			rotation: pending,
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
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
				points: [[currentPointX - radiusEllipseX, currentPointY +3]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}
		return {
			points: [[currentPointX + radiusEllipseX, currentPointY- 2]],
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
					points: [[currentPointX, currentPointY + radiusEllipseY ]],
					rotation: pending,
					radius: {
						x: radiusEllipseY,
						y: radiusEllipseX,
					}
				}
			}
			return {
				points: [[currentPointX, currentPointY - radiusEllipseY]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}

		if(isStartLine){
			return {
				points: [[currentPointX - radiusEllipseX, currentPointY - radiusEllipseY]],
				rotation: pending,
				radius: {
					x: radiusEllipseY,
					y: radiusEllipseX,
				}
			}
		}
		return {
			points: [[currentPointX, currentPointY + radiusEllipseY]],
			rotation: pending,
			radius: {
				x: radiusEllipseY,
				y: radiusEllipseX,
			}
		}
	}

	return {
		points: [[currentPointX - radiusEllipseX, currentPointY + 4]],
		rotation: pending,
		radius: {
			x: radiusEllipseY,
			y: radiusEllipseX,
		}
	}
}
