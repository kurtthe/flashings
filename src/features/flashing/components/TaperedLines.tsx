import React from 'react';
import { BaseTouchable, Box, Divider, Icon, Text } from '@ui/components';
import { isNaN } from 'lodash';
import { BackArrowIcon, NextArrowIcon } from '@assets/icons';
import { TextInput } from 'react-native';
import { isAndroid } from '@shared/platform';
import { useAppDispatch, useAppSelector } from '@hooks/useStore';
import { LINE_SELECTED } from '@features/flashing/components/Board/types';
import {
  getDataFlashingDraft,
  getSideTapered,
} from '@store/flashings/selectors';

type Props = {
  onDone: (sizeLine: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
};
const TaperedLines: React.FC<Props> = ({ onDone, onNext, onPrevious }) => {
  const dispatch = useAppDispatch();
  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const isFront = useAppSelector(state => getSideTapered(state));

  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [measurement, setMeasurement] = React.useState(0);
  const [dataLine, setDataLine] = React.useState<LINE_SELECTED>();
  const [indexLineSelectedFront, setIndexLineSelectedFront] = React.useState(0);
  const [indexLineSelectedBack, setIndexLineSelectedBack] = React.useState(0);

  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (!dataLine) return;
    inputRef.current?.focus();
    setMeasurement(dataLine.sizeLine);
  }, [dataLine, dataLine?.sizeLine]);

  const handleDone = (newSizeLine: string) => {
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);
    onDone(size);
  };

  const handlePrevious = () => {
    handleDone(`${measurement}`);
    onPrevious && onPrevious();
  };

  const handleNext = () => {
    handleDone(`${measurement}`);
    onNext && onNext();
  };
  return (
    <>
      <Box p="s" backgroundColor="white">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          <Box as={BaseTouchable} onPress={handlePrevious}>
            <Icon color="black" as={BackArrowIcon} size={22} />
          </Box>

          <Text variant="subheadSecondary">Length</Text>
          <Box flexDirection="row" alignItems="center">
            <TextInput
              ref={inputRef}
              inputMode="numeric"
              keyboardType="numeric"
              style={[
                {
                  textAlign: 'center',
                  height: 30,
                  width: 80,
                  backgroundColor: 'white',
                  color: '#000',
                },
                isAndroid && { padding: 10, height: 40 },
              ]}
              value={`${isNaN(measurement) ? '0' : measurement}`}
              onChangeText={(newText: string) => {
                const newCharacters = newText.split(
                  dataLine?.sizeLine?.toString() ?? '',
                );
                if (newCharacters.length > 1) {
                  return setMeasurement(parseInt(newCharacters[1], 10));
                }
                setMeasurement(parseInt(newText, 10));
              }}
            />
            <Text variant="bodyBold">mm</Text>
          </Box>

          <Box as={BaseTouchable} onPress={handleNext}>
            <Icon as={NextArrowIcon} size={22} color="black" />
          </Box>
        </Box>
        <Divider my="s" />
      </Box>
    </>
  );
};

export default TaperedLines;
