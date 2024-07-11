import React, { useMemo } from 'react';
import { buildPathLine, getIndexOfStepForName } from '@features/flashing/utils';
import { G, Path as PathComponent } from 'react-native-svg';
import AngleComponent from '@features/flashing/components/Angle/Angle';
import { BUILD_LINE } from '@features/flashing/components/Board/types';

type Props = BUILD_LINE & {
  angle: number;
  typeSelected?: 'line' | 'angle';
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
  const measurementIndex = useMemo(
    () => getIndexOfStepForName('measurements'),
    [],
  );
  const previewIndex = useMemo(() => getIndexOfStepForName('preview'), []);
  const screenShotIndex = useMemo(
    () => getIndexOfStepForName('screen_shot'),
    [],
  );

  const _showAngleText = useMemo(() => {
    return (
      (step >= measurementIndex || previewIndex === step) &&
      screenShotIndex !== step
    );
  }, [step]);

  const isMeasurements = step === measurementIndex;

  const colorSelected = '#DEA000';
  const isLineSelected = lineSelected === id && typeSelected === 'line';
  const isAngleSelected = lineSelected === id && typeSelected === 'angle';

  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={isLineSelected && isMeasurements ? 2 : 1}
        stroke={isLineSelected && isMeasurements ? colorSelected : '#000'}
      />
      {_showAngleText && angle > 0 && (
        <AngleComponent
          id={`angleLine${id}`}
          angle={angle}
          line={line}
          isSelected={isAngleSelected && isMeasurements}
          nextLine={nextLine}
        />
      )}
    </G>
  );
};

export default LineMadeComponent;
