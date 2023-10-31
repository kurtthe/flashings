import React from "react";
import { BREAK_END_START_LINE_TYPE, LINE_TYPE, POINT_TYPE, START_END_LINE_TYPE } from "@models";
import { Path as PathComponent } from "react-native-svg";
import { buildPathLine } from "@features/flashing/utils";

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
	const marginVertical = 5
	const {points, pending} = dataLine
	const pointX1 = points[0][0];
	const pointX2 = points[1][0];

	const pointY1 = points[0][1];
	const pointY2 = points[1][1];

	const isHorizontal = pointY1 === pointY2;
	const isVertical = pointX1 === pointX2;

	if(isHorizontal){
		return `M${pointX1} ${pointY1} Q ${pointX1} ${pointY1 * 1.2} ${pointX1 * 1.3} ${pointY1}`
	}

	if(isVertical){
		return `M${pointX1} ${pointY1} Q ${(pointX1-pointX1 - 20) * -1 } ${pointY1} ${pointX1} ${pointY1 * 1.2}`
	}

	return `M${pointX1} ${pointY1} Q ${pointX1} ${pointY1 * 1.2} ${pointX1 * 1.3} ${pointY1}`
}

export const getEndStartTypeLine = ({typeStart, typeEnd, isRightBlueLine, lineEnd, lineStart}:START_END_LINE_TYPE )=>{
	const pointsStart = calculateTypeLine({ type: typeStart, line: lineStart, start:true, isRight: isRightBlueLine })
	const pointsEnd = calculateTypeLine({ type: typeEnd, line: lineEnd, start:false, isRight: isRightBlueLine })

	const isSafetyStart = typeStart.includes('safety')
	const isSafetyEnd = typeEnd.includes('safety')

	const calculateEnd = pointsEnd[0][0] - pointsEnd[1][0]

	const pathSafetyStart = calculatePointsParabola(lineStart, isRightBlueLine)
	const pathSafetyEnd = `M${pointsEnd[0][0]},${pointsEnd[0][1]} a${calculateEnd}, ${calculateEnd / 2} 0 1,0 0,${calculateEnd} a${calculateEnd / 2},0 0 0,0 0,0`

	return (
		<>
			{
				typeStart !== 'none' && (
					<PathComponent
						d={isSafetyStart? pathSafetyStart : buildPathLine(pointsStart)}
						strokeWidth={1}
						stroke="#000"
						fill="none"
					/>
				)
			}
			{
				typeEnd !== 'none' && (
					<PathComponent
						d={isSafetyEnd? pathSafetyEnd : buildPathLine(pointsEnd)}
						strokeWidth={1}
						stroke="#000"
						fill="none"
					/>
				)
			}
		</>
	)
}
