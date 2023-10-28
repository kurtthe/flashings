import {
  DREW_LINE_TYPE, heightScreen,
  SIZE_POINTER,
  SIZE_POINTER_LAST,
  widthScreen
} from "@features/flashing/components/Board";
import { GridComponent } from '@features/flashing/components/index';
import PointerComponent from '@features/flashing/components/Pointer';
import Svg, { Path as PathComponent } from "react-native-svg";
import React from 'react';
import { Path, serialize } from "react-native-redash";
import { buildPathLine, getEndStartTypeLine, getIndexOfStepForName } from "@features/flashing/utils";
import { TYPE_END_LINES } from "@models";

type Props = {
  graphs: DREW_LINE_TYPE[];
  pathParallel: Path | null;
  step: number;
  height?: number;
  width?: number;
  typeEndLine: TYPE_END_LINES;
  typeStartLine: TYPE_END_LINES;
  isRight: boolean;
};
const SvgBoard: React.FC<Props> = ({
  graphs = [],
  step,
  pathParallel,
  width= widthScreen,
  height= heightScreen,
  typeEndLine,
  typeStartLine,
  isRight
}) => {
  const colorPointer = '#8F94AE';
  const colorBorderPointer = '#000000';
  const borderWidth = 1;
  const isDraw = step === getIndexOfStepForName('draw');

  const renderTypeEndStartLines= () => {
    if(graphs.length < 2) return
    const pointsStartEndType = getEndStartTypeLine({typeEnd:typeEndLine, typeStart: typeStartLine, lineStart:graphs[0], lineEnd:graphs[graphs.length -1], isRightBlueLine: isRight })

    return (
      <>
        {
          typeStartLine !== 'none' && (
            <PathComponent
              d={buildPathLine(pointsStartEndType.start)}
              strokeWidth={1}
              stroke="#000"
            />
          )
        }
        {
          typeEndLine !== 'none' && (
            <PathComponent
              d={buildPathLine(pointsStartEndType.end)}
              strokeWidth={1}
              stroke="#000"
            />
          )
        }
      </>
    )
  }

  return (
    <Svg width={width} height={height}>
      <GridComponent />
      {renderTypeEndStartLines()}
      {graphs.map(({ points, path: LineComponent, isLine }, index) => (
        <React.Fragment key={`${Math.random()}`}>
          {pathParallel && <PathComponent
            d={serialize(pathParallel)}
            stroke={"#0056FF"}
            strokeWidth={1}
            fill="transparent"
          />}
          {LineComponent}
          {isDraw && <PointerComponent
            key={`first-point-line${index}`}
            cx={points[0][0]}
            cy={points[0][1]}
            r={SIZE_POINTER}
            fill={colorPointer}
            strokeWidth={borderWidth}
            stroke={colorBorderPointer}
          />}
          {isLine &&
            (
              <>
                {
                  graphs.length - 1 === index && !isDraw ?null :(<PointerComponent
                      key={`second-point-line${index}`}
                      cx={points[1][0]}
                      cy={points[1][1]}
                      r={SIZE_POINTER}
                      fill={colorPointer}
                      strokeWidth={borderWidth}
                      stroke={colorBorderPointer}
                    />)
                }
              </>
            )
          }
        </React.Fragment>
      ))}
    </Svg>
  );
};
export default SvgBoard;
