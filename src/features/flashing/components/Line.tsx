import React from 'react';
import { BUILD_LINE, LETTER_LINES } from '@features/flashing/components/Board';
import {
  buildPathLine,
  calculateParallelLine,
  calculatePositionText,
} from '@features/flashing/utils';
import { G, Path as PathComponent} from 'react-native-svg';
import TextSvg from "@features/flashing/components/TextSvg";

type Props = BUILD_LINE & {
  showAngle?: number
};
const LineMadeComponent: React.FC<Props> = ({
  line,
  onPressLine,
  isDrawing,
  id,
  rightLinePaint,
  showAngle
}) => {
  const fontSize = 20;
  const colorLabel = '#8F94AE';
  const positionText = calculatePositionText(line);
  // const pointsParallel = calculateParallelLine(line, rightLinePaint);
  const positionTextAngle = calculatePositionText(line, 0, true);
  const pointsParallel = calculateParallelLine(line, rightLinePaint);

  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        onPress={() => onPressLine(id)}
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={1}
        stroke="#000"
      />
      <PathComponent
        onPress={() => onPressLine(id)}
        key={`parallelLine${id}`}
        d={buildPathLine(pointsParallel)}
        strokeWidth={1}
        stroke="#0056FF"
      />
      {showAngle && (
        <TextSvg id={id} onPress={onPressLine} positionTextYRect={positionTextAngle[1] -4} positionTextXRect={positionTextAngle[0] + 6} positionTextX={positionTextAngle[0] + 28} positionTextY={positionTextAngle[1] + 10} textValue={`${showAngle}°`} />
      )}
      {!isDrawing && line.distance ? (
          <TextSvg id={id} onPress={onPressLine} positionTextYRect={positionText[1] - 14} positionTextXRect={positionText[0] - 28} positionTextX={positionText[0]-3} positionTextY={positionText[1]} textValue={`${line.distance}in`} />
      ) : null}
      <TextSvg colorLabel={colorLabel} fontSize={fontSize} id={id} onPress={onPressLine} positionTextYRect={positionText[1] - 50} positionTextXRect={positionText[0] - 12} positionTextX={positionText[0]} positionTextY={positionText[1] - 35} textValue={LETTER_LINES[id]} />
    </G>
  );
};

export default LineMadeComponent;
