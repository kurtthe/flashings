import {useAppDispatch, useAppSelector} from '@hooks/useStore';

import React from 'react';
import {getIndexOfStepForName} from '@features/flashing/utils';
import SectionsButtons from './SectionsButtons';
import {getBoardFlashingData, getStep} from '@store/board/selectors';
import {boardActions} from '@store/board';
type Props = {
  onSave?: () => void;
};
const SectionButton: React.FC<Props> = ({onSave}) => {
  const dispatch = useAppDispatch();
  const stepBoard = useAppSelector(state => getStep(state));
  const flashingDataDraft = useAppSelector(state =>
    getBoardFlashingData(state),
  );

  const handleOnTapered = () => {
    if (!flashingDataDraft) return;

    dispatch(
      boardActions.updateDataFlashing({
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
    dispatch(boardActions.changeStep({step: getIndexOfStepForName('tapered')}));
  };

  const handleOnSave = () => {
    dispatch(
      boardActions.changeStep({
        step: getIndexOfStepForName('screen_shot'),
      }),
    );
    onSave?.();
  };

  const handleOnEdit = () => {
    dispatch(
      boardActions.changeStep({
        step: getIndexOfStepForName('measurements'),
      }),
    );
  };

  const handleOnEditEndType = () => {
    dispatch(
      boardActions.changeStep({step: getIndexOfStepForName('end_type')}),
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
