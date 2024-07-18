import React, { useMemo } from 'react';
import { buildPathLine, getIndexOfStepForName } from '@features/flashing/utils';
import { G, Path as PathComponent } from 'react-native-svg';
import AngleComponent from '@features/flashing/components/Angle/Angle';
import { BUILD_LINE } from '@features/flashing/components/Board/types';
import { useAppSelector } from '@hooks/useStore';
import { getStep } from '@store/flashings/selectors';

type Props = BUILD_LINE & {
  angle: number;
  typeSelected?: 'line' | 'angle';
};

const LineMadeComponent: React.FC<Props> = ({
  line,
  lineSelected,
  id,
  angle,
  typeSelected = 'line',
  nextLine,
}) => {
  const step = useAppSelector(state => getStep(state));
  const colorSelected = '#DEA000';

  const indexMeasurement = getIndexOfStepForName('measurements');

  const isMeasurements = useMemo(
    () => step === indexMeasurement,
    [step, indexMeasurement],
  );

  const isTapered = useMemo(
    () => step === getIndexOfStepForName('tapered'),
    [step],
  );

  const _showAngleText = step >= indexMeasurement;

  const _lineSelected = React.useMemo(() => {
    const isLineSelected = lineSelected === id && typeSelected === 'line';
    return isLineSelected && (isMeasurements || isTapered);
  }, [isTapered, isMeasurements, id, lineSelected, typeSelected]);

  const isAngleSelected = React.useMemo(() => {
    const validationType = lineSelected === id && typeSelected === 'angle';
    return validationType && isMeasurements;
  }, [lineSelected, id, typeSelected]);

  return (
    <G key={`groupPath${id}`}>
      <PathComponent
        key={`normalLine${id}`}
        d={buildPathLine(line.points)}
        strokeWidth={_lineSelected ? 2 : 1}
        stroke={_lineSelected ? colorSelected : '#000'}
      />
      {_showAngleText && angle > 0 && (
        <AngleComponent
          id={`angleLine${id}`}
          angle={angle}
          line={line}
          isSelected={isAngleSelected}
          nextLine={nextLine}
        />
      )}
    </G>
  );
};

export default LineMadeComponent;
