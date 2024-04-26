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

type Props = {
  width?: number;
  height?: number;
  imgPreview: string | undefined;
  dataFlashing: FLASHINGS_DATA;
};
const PreviewFlashing: React.FC<Props> = ({
  imgPreview,
  dataFlashing,
  width = 120,
  height = 92,
}) => {
  const [anglesLines, setAnglesLines] = React.useState<number[]>([]);
  const modalBottomRef = React.useRef<ModalBottomRef>();

  React.useEffect(() => {
    if (dataFlashing.dataLines.length < 2) return;

    const newAngles = dataFlashing.dataLines.map((line, index, arrayLines) => {
      if (!anglesLines[index]) {
        return calculateAngle(line, arrayLines[index + 1]) ?? 0;
      }
      return anglesLines[index];
    });
    setAnglesLines(newAngles);
  }, [dataFlashing.dataLines]);

  return (
    <>
      <TouchableOpacity onPress={() => modalBottomRef.current?.show()}>
        {imgPreview && (
          <Image
            resizeMode="contain"
            source={{ uri: imgPreview }}
            width={90}
            height={250}
            style={{
              transform: [{ scale: 2 }],
              top: 15,
              left: 25,
            }}
          />
        )}
      </TouchableOpacity>

      <ModalBottom
        backdropClosesSheet={true}
        ref={modalBottomRef}
        height={500}
        draggable={false}>
        <Box backgroundColor="white">
          <Board
            rightLinePaint={dataFlashing.parallelRight}
            lines={dataFlashing.dataLines}
            angles={anglesLines}
            stepBoard={getIndexOfStepForName('preview')}
            startTypeLine={dataFlashing.startType}
            endTypeLine={dataFlashing.endType}
          />
        </Box>
      </ModalBottom>
    </>
  );
};

export default PreviewFlashing;
