import React from 'react';
import {POINT_TYPE} from '@models';
import {
  calculatePointHalf,
  getIndexOfStepForName,
  setUpPendingForTheLabel,
} from '@features/flashing/utils';
import TextSvg from '@features/flashing/components/TextSvg';
import {useAppSelector} from '@hooks/useStore';
import {
  getDataFlashingDraft,
  getSideTapered,
  getStep,
} from '@store/flashings/selectors';
import {gettingCoordinatesForLabel} from './calculatePostionsText';

type Props = {
  coordinates: POINT_TYPE[];
  index: number;
};

const TextSvgLineMM: React.FC<Props> = ({coordinates, index}) => {
  const step = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
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

  const _getPending = React.useMemo(() => {
    const pend = flashingDataDraft?.dataLines[index]?.pending;
    return setUpPendingForTheLabel(pend);
  }, [isFront, flashingDataDraft, index]);

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

  const {positionRect, positionText} = React.useMemo(() => {
    const newPoints = calculatePointHalf(coordinates);

    return gettingCoordinatesForLabel(
      newPoints,
      _getPending,
      parseInt(label ? label : '10'),
      flashingDataDraft?.parallelRight,
    );
  }, [coordinates, _getPending, label, flashingDataDraft?.parallelRight]);

  const shouldRenderTextSvg = step >= getIndexOfStepForName('measurements');

  if (!shouldRenderTextSvg || !label) return null;

  return (
    <TextSvg
      id={Math.random()}
      positionTextX={positionText[0]}
      positionTextY={positionText[1]}
      positionTextXRect={positionRect[0]}
      positionTextYRect={positionRect[1]}
      textValue={label}
      pending={_getPending}
    />
  );
};

export default TextSvgLineMM;
