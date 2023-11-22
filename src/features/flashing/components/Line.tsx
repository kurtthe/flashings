import React from 'react';
import { BUILD_LINE, LETTER_LINES } from '@features/flashing/components/Board';
import {
  buildPathLine,
  calculatePointHalf, getIndexOfStepForName, positionEndLine
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
  step,
  id,
  angle,
  typeSelected= "line"
}) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePointHalf(line);
  const positionTextAngle = positionEndLine(line);
  const measurementIndex = getIndexOfStepForName('measurements')
  const previewIndex = getIndexOfStepForName('preview')
  const isMeasurements = step === measurementIndex;

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
      {((step >= measurementIndex || previewIndex === step) && angle > 0) && (
        <TextSvg
          id={id}
          colorLabel={angleIsSelected && isMeasurements? colorSelected: '#000'}
          positionTextYRect={positionTextAngle[1] - 13}
          positionTextXRect={positionTextAngle[0] + 5}
          positionTextX={positionTextAngle[0] + 20}
          positionTextY={positionTextAngle[1]}
          textValue={`${angle}°`}
        />
      )}
      {(step >= measurementIndex || previewIndex === step) && (
          <>
            <TextSvg
              colorLabel={colorLabel}
              fontSize={fontSize}
              id={id}
              positionTextX={positionText[0]}
              positionTextY={positionText[1]}
              textValue={LETTER_LINES[id]} />
            {line.distance && (
              <TextSvg
                id={id}
                positionTextX={positionText[0]}
                positionTextY={positionText[1] + 15}
                textValue={`${line.distance}mm`}
              />
            )
            }
          </>
        )}
    </G>
  );
};

export default LineMadeComponent;
