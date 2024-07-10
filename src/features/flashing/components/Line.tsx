import React from 'react';
import { buildPathLine, getIndexOfStepForName } from '@features/flashing/utils';
import { G, Path as PathComponent } from 'react-native-svg';
import AngleComponent from '@features/flashing/components/Angle/Angle';
import { BUILD_LINE } from '@features/flashing/components/Board/types';

type Props = BUILD_LINE & {
  angle: number;
  typeSelected: 'line' | 'angle';
};
const LineMadeComponent: React.FC<Props> = ({
  line,
  lineSelected,
  step,
  id,
  angle,
  typeSelected = 'line',
  nextLine,
}) => {
  const measurementIndex = getIndexOfStepForName('measurements');
  const previewIndex = getIndexOfStepForName('preview');
  const isMeasurements = step === measurementIndex;

  const colorSelected = '#DEA000';
  const lineIsSelected = lineSelected === id && typeSelected === 'line';
  const angleIsSelected = lineSelected === id && typeSelected === 'angle';

  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={lineIsSelected && isMeasurements ? 2 : 1}
        stroke={lineIsSelected && isMeasurements ? colorSelected : '#000'}
      />
      <AngleComponent
        id={`angleLine${id}`}
        visible={
          (step >= measurementIndex || previewIndex === step) && angle > 0
        }
        angle={angle}
        line={line}
        isSelected={angleIsSelected && isMeasurements}
        nextLine={nextLine}
      />
    </G>
  );
};

export default LineMadeComponent;
