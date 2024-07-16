import React from 'react';
import { FLASHINGS_DATA } from '@models';
import { Box } from '@ui/components';
import { Image, TouchableOpacity } from 'react-native';
import { ModalBottom, ModalBottomRef } from '@components';
import {
  calculateAngle,
  getIndexOfStepForName,
} from '@features/flashing/utils';
import Board from '@features/flashing/components/Board/Board';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { getDataFlashingDraft } from '@store/flashings/selectors';
import { actions as flashingActions } from '@store/flashings/actions';

type Props = {
  width?: number;
  height?: number;
  imgPreview: string | undefined;
  dataFlashing: FLASHINGS_DATA;
  jobId: number;
};
const PreviewFlashing: React.FC<Props> = ({
  imgPreview,
  jobId,
  dataFlashing,
}) => {
  const dispatch = useAppDispatch();
  const flashingDataPreview = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const [anglesLines, setAnglesLines] = React.useState<number[]>([]);
  const modalBottomRef = React.useRef<ModalBottomRef>();

  const _setStoreDataFlashing = () => {
    if (!dataFlashing) return;

    dispatch(
      flashingActions.addFlashingDraft({
        dataFlashing: dataFlashing,
        jobId: jobId,
        step: getIndexOfStepForName('preview'),
      }),
    );
  };

  React.useEffect(() => {
    if (!flashingDataPreview || flashingDataPreview.dataLines.length < 2)
      return;

    const newAngles = flashingDataPreview.dataLines.map(
      (line, index, arrayLines) => {
        if (!anglesLines[index]) {
          return calculateAngle(line, arrayLines[index + 1]) ?? 0;
        }
        return anglesLines[index];
      },
    );
    setAnglesLines(newAngles);
  }, [flashingDataPreview?.dataLines]);

  const handleShowPreview = () => {
    _setStoreDataFlashing();
    modalBottomRef.current?.show();
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleShowPreview}
        style={{
          borderWidth: 1,
          borderColor: 'lightgray',
          marginVertical: 5,
          borderRadius: 5,
        }}>
        {imgPreview && (
          <Image
            resizeMode="contain"
            source={{ uri: imgPreview }}
            width={90}
            height={100}
            style={{
              transform: [{ scale: 2 }],
              top: 15,
              left: 25,
            }}
          />
        )}
      </TouchableOpacity>

      <ModalBottom
        backdropClosesSheet
        ref={modalBottomRef}
        height={500}
        draggable={false}
        onCloseFinish={() => {
          dispatch(flashingActions.clear());
        }}>
        <Box backgroundColor="white">
          <Board />
        </Box>
      </ModalBottom>
    </>
  );
};

export default PreviewFlashing;
