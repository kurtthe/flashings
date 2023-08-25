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
  onPressLine,
  mode,
  id,
  showAngle
}) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePointHalf(line);
  const isMeasurements = mode === 'measurements'
  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        onPress={() => onPressLine(id)}
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={1}
        stroke="#000"
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
          </>
        )
      }
    </G>
  );
};

export default LineMadeComponent;
