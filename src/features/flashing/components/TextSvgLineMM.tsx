import React from 'react';

import {
  calculatePointHalf,
  getIndexOfStepForName,
} from '@features/flashing/utils';
import TextSvg from '@features/flashing/components/TextSvg';
import {useAppSelector} from '@hooks/useStore';
import {POINT_TYPE} from '@models/board';
import {
  getBoardFlashingData,
  getSideTapered,
  getStep,
} from '@store/board/selectors';

type Props = {
  coordinates: POINT_TYPE[];
  index: number;
};

const TextSvgLineMM: React.FC<Props> = ({coordinates, index}) => {
  const step = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getBoardFlashingData(state),
  );
  const isFront = useAppSelector(state => getSideTapered(state));
  const minorMeasurement = React.useMemo(() => {
    return step < getIndexOfStepForName('measurements');
  }, [step]);

  const isTapered = React.useMemo(() => {
    return (
      step === getIndexOfStepForName('tapered') ||
      step === getIndexOfStepForName('save_tapered') ||
      step === getIndexOfStepForName('preview') ||
      step === getIndexOfStepForName('screen_shot')
    );
  }, [step]);

  const label = React.useMemo(() => {
    if (minorMeasurement || !flashingDataDraft) return '';

    if (flashingDataDraft.tapered && isTapered) {
      const valueTapered =
        flashingDataDraft.tapered[isFront ? 'front' : 'back'][index];
      if (!valueTapered) return undefined;
      return valueTapered.distance?.toString();
    }

    return flashingDataDraft?.dataLines[index].distance?.toString();
  }, [isFront, flashingDataDraft, index]);

  const newPoints = calculatePointHalf(coordinates);
  const shouldRenderTextSvg = step >= getIndexOfStepForName('measurements');

  if (!shouldRenderTextSvg || !label) return null;

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
