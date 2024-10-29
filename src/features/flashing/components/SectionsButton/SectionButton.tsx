import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {getDataFlashingDraft, getStep} from '@store/flashings/selectors';
import React from 'react';
import {getIndexOfStepForName} from '@features/flashing/utils';
import SectionsButtons from './SectionsButtons';
import {actions as flashingActions} from '@store/flashings/actions';
type Props = {
  onSave?: () => void;
};
const SectionButton: React.FC<Props> = ({onSave}) => {
  const dispatch = useAppDispatch();
  const stepBoard = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );

  const handleOnTapered = () => {
    if (!flashingDataDraft) return;

    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          tapered: {
            front: flashingDataDraft.dataLines,
            back: flashingDataDraft.dataLines,
            frontImagePreview: undefined,
            backImagePreview: undefined,
          },
        },
      }),
    );
    dispatch(
      flashingActions.changeStep({step: getIndexOfStepForName('tapered')}),
    );
  };

  const handleOnSave = () => {
    dispatch(
      flashingActions.changeStep({
        step: getIndexOfStepForName('screen_shot'),
      }),
    );
    onSave?.();
  };

  const handleOnEdit = () => {
    dispatch(
      flashingActions.changeStep({
        step: getIndexOfStepForName('measurements'),
      }),
    );
  };

  const handleOnEditEndType = () => {
    dispatch(
      flashingActions.changeStep({step: getIndexOfStepForName('end_type')}),
    );
  };

  if (stepBoard !== getIndexOfStepForName('finish')) {
    return null;
  }

  return (
    <SectionsButtons
      onTapered={handleOnTapered}
      onSave={handleOnSave}
      onEdit={handleOnEdit}
      onEditEndType={handleOnEditEndType}
    />
  );
};

export default SectionButton;
