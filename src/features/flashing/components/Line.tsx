import React from 'react';
import { BUILD_LINE, LETTER_LINES } from '@features/flashing/components/Board';
import {
  buildPathLine,
  calculatePointHalf, positionEndLine
} from "@features/flashing/utils";
import { G, Path as PathComponent} from 'react-native-svg';
import TextSvg from "@features/flashing/components/TextSvg";

type Props = BUILD_LINE & {
  angle: number
  typeSelected: 'line' | 'angle'
};
const LineMadeComponent: React.FC<Props> = ({
  line,
  lineSelected,
  mode,
  id,
  angle,
  typeSelected= "line"
}) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePointHalf(line);
  const positionTextAngle = positionEndLine(line);
  const isMeasurements = mode === 'measurements';
  const isFinish = mode === 'finish'
  const isPreview = mode === 'preview'
  const colorSelected = "#DEA000"
  const lineIsSelected = lineSelected === id && typeSelected === "line"
  const angleIsSelected = lineSelected === id && typeSelected === "angle"

  return (
    <G key={`groupPath${id}`}>

      <PathComponent
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={lineIsSelected && isMeasurements? 2:1}
        stroke={ lineIsSelected && isMeasurements ? colorSelected:"#000"}
      />
      {(isMeasurements || isPreview || isFinish) && <>
        {
          angle > 0 && <TextSvg id={id} colorLabel={angleIsSelected && isMeasurements? colorSelected: '#000'}  positionTextYRect={positionTextAngle[1]} positionTextXRect={positionTextAngle[0]} positionTextX={positionTextAngle[0] + 5} positionTextY={positionTextAngle[1]} textValue={`${angle}°`} />
        }
      </>
      }
      {
        (isMeasurements || isPreview || isFinish) && (
          <>
            <TextSvg colorLabel={colorLabel} fontSize={fontSize} id={id}  positionTextYRect={positionText[1]} positionTextXRect={positionText[0]} positionTextX={positionText[0]} positionTextY={positionText[1]} textValue={LETTER_LINES[id]} />
            {line.distance && (
              <TextSvg id={id} positionTextYRect={positionText[1] + fontSize} positionTextXRect={positionText[0] -18}
                positionTextX={positionText[0]} positionTextY={positionText[1] + fontSize}
                textValue={`${line.distance}mm`} />
            )
            }
          </>
        )
      }
    </G>
  );
};

export default LineMadeComponent;
