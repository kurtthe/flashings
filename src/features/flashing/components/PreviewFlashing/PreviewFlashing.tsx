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
import { isTablet } from '@shared/platform';

type Props = {
  width?: number;
  height?: number;
  imgPreview: string | undefined;
  dataFlashing: FLASHINGS_DATA;
  jobId: number;
  isFront?: boolean;
};
const PreviewFlashing: React.FC<Props> = ({
  imgPreview,
  jobId,
  dataFlashing,
  isFront = true,
}) => {
  const dispatch = useAppDispatch();
  const flashingDataPreview = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const [anglesLines, setAnglesLines] = React.useState<number[]>([]);
  const modalBottomRef = React.useRef<ModalBottomRef>();

  const _setStoreDataFlashing = () => {
    if (!dataFlashing) return;

    if (dataFlashing.tapered) {
      dispatch(flashingActions.changeSideTapered({ isFront }));
    }

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
            resizeMode={isTablet ? 'cover' : 'stretch'}
            source={{ uri: imgPreview }}
            width={isTablet ? 400 : 90}
            height={isTablet ? 250 : 100}
            style={{
              transform: [{ scale: 1 }],
              top: 15,
              left: 25,
            }}
          />
        )}
      </TouchableOpacity>

      <ModalBottom
        backdropClosesSheet
        ref={modalBottomRef}
        height={isTablet ? 900 : 500}
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
