import React from 'react';
import { BUILD_LINE, LETTER_LINES } from '@features/flashing/components/Board';
import {
  buildPathLine,
  calculatePointHalf, positionEndLine
} from "@features/flashing/utils";
import { G, Path as PathComponent} from 'react-native-svg';
import TextSvg from "@features/flashing/components/TextSvg";

type Props = BUILD_LINE & {
  showAngle?: number
};
const LineMadeComponent: React.FC<Props> = ({
  line,
  lineSelected,
  mode,
  id,
  showAngle
}) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePointHalf(line);
  const positionTextAngle = positionEndLine(line);

  const isMeasurements = mode === 'measurements'
  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={lineSelected === id && isMeasurements? 2:1}
        stroke={lineSelected === id && isMeasurements ? "#DEA000":"#000"}
      />
      {
        isMeasurements && (
          <>
            <TextSvg colorLabel={colorLabel} fontSize={fontSize} id={id}  positionTextYRect={positionText[1]} positionTextXRect={positionText[0]} positionTextX={positionText[0]} positionTextY={positionText[1]} textValue={LETTER_LINES[id]} />
            {line.distance && (
              <TextSvg id={id} positionTextYRect={positionText[1] + fontSize} positionTextXRect={positionText[0] -18}
                positionTextX={positionText[0]} positionTextY={positionText[1] + fontSize}
                textValue={`${line.distance}mm`} />
            )
            }
            {
              showAngle && <TextSvg id={id}  positionTextYRect={positionTextAngle[1]} positionTextXRect={positionTextAngle[0]} positionTextX={positionTextAngle[0] + 5} positionTextY={positionTextAngle[1]} textValue={`${showAngle}°`} />
            }
          </>
        )
      }
    </G>
  );
};

export default LineMadeComponent;
