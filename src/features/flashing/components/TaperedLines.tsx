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
import { actions as flashingActions } from '@store/flashings/actions';

type Props = {
  onNext: (newIndexSelected: number) => void;
  onPrevious: (newIndexSelected: number) => void;
};
const TaperedLines: React.FC<Props> = ({ onNext, onPrevious }) => {
  const dispatch = useAppDispatch();

  const flashingDataDraft = useAppSelector(state =>
    getDataFlashingDraft(state),
  );
  const isFront = useAppSelector(state => getSideTapered(state));

  const [pointSelected, setPointSelected] = React.useState<
    LINE_SELECTED | undefined
  >();
  const [measurement, setMeasurement] = React.useState(0);
  const [indexLineSelectedFront, setIndexLineSelectedFront] = React.useState(0);
  const [indexLineSelectedBack, setIndexLineSelectedBack] = React.useState(0);

  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (!pointSelected) return;
    inputRef.current?.focus();
    setMeasurement(pointSelected.sizeLine);
  }, [pointSelected, pointSelected?.sizeLine]);

  React.useEffect(() => {
    if (
      !flashingDataDraft ||
      !flashingDataDraft.tapered?.front ||
      !flashingDataDraft.tapered?.back
    )
      return;

    const indexLineSelectedTapered = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;

    if (isFront) {
      setPointSelected({
        numberLine: indexLineSelectedTapered,
        sizeLine:
          flashingDataDraft.tapered.front[indexLineSelectedTapered]?.distance ??
          0,
        angle: flashingDataDraft.angles[indexLineSelectedTapered],
      });
      return;
    }

    setPointSelected({
      numberLine: indexLineSelectedTapered,
      sizeLine:
        flashingDataDraft.tapered.back[indexLineSelectedTapered]?.distance ?? 0,
      angle: flashingDataDraft.angles[indexLineSelectedTapered],
    });
  }, [
    indexLineSelectedBack,
    indexLineSelectedFront,
    flashingDataDraft?.tapered,
    isFront,
  ]);

  const handleDone = (newSizeLine: string) => {
    if (!pointSelected || !flashingDataDraft || !flashingDataDraft.tapered)
      return;
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);

    const updatedTapered = {
      ...flashingDataDraft.tapered,
      [isFront ? 'front' : 'back']: flashingDataDraft.tapered[
        isFront ? 'front' : 'back'
      ].map((item, index) =>
        index === (isFront ? indexLineSelectedFront : indexLineSelectedBack)
          ? { ...item, distance: size }
          : item,
      ),
    };

    dispatch(
      flashingActions.updateFlashingDraft({
        dataFlashing: {
          ...flashingDataDraft,
          tapered: updatedTapered,
        },
      }),
    );
  };

  const _onMoveLine = React.useCallback(
    (indexNextOrBack: number) => {
      if (!flashingDataDraft) return;

      if (indexNextOrBack >= flashingDataDraft.dataLines.length) {
        indexNextOrBack = flashingDataDraft.dataLines.length - 1;
      }

      if (isFront) {
        setIndexLineSelectedFront(indexNextOrBack);
      } else {
        setIndexLineSelectedBack(indexNextOrBack);
      }

      handleDone(`${measurement}`);
    },
    [flashingDataDraft],
  );

  const handlePrevious = () => {
    const newIndexSelected = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;

    _onMoveLine(newIndexSelected - 1);
    handleDone(`${measurement}`);
    onPrevious(newIndexSelected - 1);
  };

  const handleNext = () => {
    const newIndexSelected = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;

    _onMoveLine(newIndexSelected + 1);
    onNext(newIndexSelected);
  };

  console.log('==>measurement tapered', measurement);

  if (!pointSelected) return null;

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
                  pointSelected?.sizeLine?.toString() ?? '',
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
