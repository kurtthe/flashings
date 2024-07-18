import React from 'react';
import { POINT_TYPE } from '@models';
import {
  calculatePointHalf,
  getIndexOfStepForName,
} from '@features/flashing/utils';
import TextSvg from '@features/flashing/components/TextSvg';
import { useAppSelector } from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getSideTapered,
  getStep,
} from '@store/flashings/selectors';
import { useSelector } from 'react-redux';

type Props = {
  coordinates: POINT_TYPE[];
  index: number;
};

const TextSvgLineMM: React.FC<Props> = ({ coordinates, index }) => {
  const step = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const isFront = useSelector(getSideTapered);

  const indexMeasurement = getIndexOfStepForName('measurements');
  const isTapered = React.useMemo(() => {
    return step === getIndexOfStepForName('tapered');
  }, [step]);

  const label = React.useMemo(() => {
    if (!flashingDataDraft) return '';

    if (indexMeasurement >= step) {
      if (isTapered && flashingDataDraft.tapered) {
        return flashingDataDraft.tapered[isFront ? 'front' : 'back'][
          index
        ].distance.toString();
      }
      return flashingDataDraft.dataLines[index].distance.toString();
    }
    return '';
  }, [flashingDataDraft, indexMeasurement, isTapered, isFront, index]);

  const newPoints = calculatePointHalf(coordinates);

  const shouldRenderTextSvg = step >= getIndexOfStepForName('measurements');

  console.log('=?>', !!flashingDataDraft);

  if (shouldRenderTextSvg) {
    return (
      <TextSvg
        id={Math.random()}
        positionTextX={newPoints[0]}
        positionTextY={newPoints[1] + 10}
        positionTextXRect={newPoints[0] - label.length * 5}
        positionTextYRect={newPoints[1] - 5}
        textValue={label}
      />
    );
  }

  return null;
};

export default TextSvgLineMM;
