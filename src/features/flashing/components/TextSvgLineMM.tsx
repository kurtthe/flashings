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
  const isFront = useAppSelector(state => getSideTapered(state));

  const indexMeasurement = getIndexOfStepForName('measurements');

  console.log('isFront===>', isFront);

  const isTapered = React.useMemo(() => {
    return step === getIndexOfStepForName('tapered');
  }, [step]);

  const getLabel = () => {
    if (step < indexMeasurement || !flashingDataDraft) return '';

    if (isTapered && flashingDataDraft.tapered) {
      return flashingDataDraft.tapered[isFront ? 'front' : 'back'][
        index
      ].distance.toString();
    }
    return flashingDataDraft?.dataLines[index].distance.toString();
  };

  const newPoints = calculatePointHalf(coordinates);
  const shouldRenderTextSvg = step >= getIndexOfStepForName('measurements');

  if (!shouldRenderTextSvg) return null;

  const label = getLabel();
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
};

export default TextSvgLineMM;
