import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, TYPE_END_LINES, TYPE_END_LINES_BREAK } from "@models";
import { isNaN } from "lodash";
import anglesBreaks from'./anglesBreaks.json'

const equationResultAzimuth = {
	'1': 'angle',
	'2': '180-angle',
	'3': '180+angle',
	'4': '360-angle'
}

const changeTheTypeLine = (typeLine: TYPE_END_LINES_BREAK): TYPE_END_LINES_BREAK=> {
	const has1 = typeLine.includes('1')
	return (has1? typeLine.replace('1','2'): typeLine.replace('2','1')) as TYPE_END_LINES_BREAK
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
export const getAngleForTheLine = (line:LINE_TYPE, typeLine: TYPE_END_LINES_BREAK): number => {
	const angleAzimut = parseInt(calculateAngleAzimut(line))

	const pointX1 = line.points[0][0];
	const pointX2 = line.points[1][0];

	const pointY1 = line.points[0][1];
	const pointY2 = line.points[1][1];

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	const dataAngles =  anglesBreaks.find((angleB)=> angleB.default === angleAzimut.toString())

	if(!dataAngles) return NaN

	if(isHorizontal){
		if(pointX2 < pointX1){
			return parseInt(`${dataAngles.angles[changeTheTypeLine(typeLine)]}`)
		}
	}

	if(isVertical){
		if(pointY1 > pointY2){
			return parseInt(`${dataAngles.angles[changeTheTypeLine(typeLine)]}`)
		}
	}

	return parseInt(`${dataAngles.angles[typeLine]}`)

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


