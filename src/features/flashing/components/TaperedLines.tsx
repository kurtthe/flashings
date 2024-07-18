import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BaseTouchable, Box, Divider, Icon, Text } from '@ui/components';
import { isNaN } from 'lodash';
import { BackArrowIcon, NextArrowIcon } from '@assets/icons';
import { isAndroid } from '@shared/platform';
import { LINE_SELECTED } from '@features/flashing/components/Board/types';
import {
  getDataFlashingDraft,
  getSideTapered,
} from '@store/flashings/selectors';
import { actions as flashingActions } from '@store/flashings/actions';
import { getIndexOfStepForName } from '@features/flashing/utils';

type Props = {
  onChangeIndexSelected: (newIndexSelected: number) => void;
};

const TaperedLines: React.FC<Props> = ({ onChangeIndexSelected }) => {
  const dispatch = useDispatch();
  const flashingDataDraft = useSelector(getDataFlashingDraft);
  const isFront = useSelector(getSideTapered);

  const [pointSelected, setPointSelected] = useState<
    LINE_SELECTED | undefined
  >();
  const [measurement, setMeasurement] = useState(0);
  const [indexLineSelectedFront, setIndexLineSelectedFront] = useState(0);
  const [indexLineSelectedBack, setIndexLineSelectedBack] = useState(0);
  const inputRef = useRef<TextInput>(null);

  React.useEffect(() => {
    if (isFront) {
      setIndexLineSelectedBack(0);
    } else setIndexLineSelectedFront(0);

    onChangeIndexSelected(0);
  }, [isFront]);

  useEffect(() => {
    if (pointSelected) {
      inputRef.current?.focus();
      setMeasurement(pointSelected.sizeLine);
    }
  }, [pointSelected]);

  useEffect(() => {
    if (!flashingDataDraft || !flashingDataDraft.tapered) return;

    const indexLineSelected = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;
    const taperedData = isFront
      ? flashingDataDraft.tapered.front
      : flashingDataDraft.tapered.back;

    setPointSelected({
      numberLine: indexLineSelected,
      sizeLine: taperedData[indexLineSelected]?.distance ?? 0,
      angle: flashingDataDraft.angles[indexLineSelected],
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

  const _validateIndexLine = (newIndexParams: number) => {
    if (!flashingDataDraft) return 0;
    let newIndex = newIndexParams;
    const maxIndex = flashingDataDraft.dataLines.length - 1;

    if (newIndex > maxIndex) {
      return maxIndex;
    }

    if (newIndex < 0) {
      return 0;
    }

    return newIndex;
  };

  const handleMoveLine = (newIndex: number) => {
    if (!flashingDataDraft) return;
    const maxIndex = flashingDataDraft.dataLines.length - 1;

    if (isFront) {
      setIndexLineSelectedFront(newIndex);
    } else {
      if (newIndex > maxIndex) {
        dispatch(
          flashingActions.changeStep({
            step: getIndexOfStepForName('save_tapered'),
          }),
        );
      }
      setIndexLineSelectedBack(newIndex);
    }

    handleDone(`${measurement}`);
  };

  const handlePrevious = () => {
    const newIndexSelected = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;

    const newIndexPreview = _validateIndexLine(newIndexSelected - 1);

    handleMoveLine(newIndexPreview);
    onChangeIndexSelected(newIndexPreview);
  };

  const handleNext = () => {
    const newIndexSelected = isFront
      ? indexLineSelectedFront
      : indexLineSelectedBack;

    console.log('==>newIndexSelected', newIndexSelected);
    const newIndexPreview = _validateIndexLine(newIndexSelected + 1);
    console.log('==>newIndexPreview', newIndexPreview);

    handleMoveLine(newIndexPreview);
    onChangeIndexSelected(newIndexPreview);
  };

  if (!pointSelected) return null;

  return (
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
              const size = parseInt(newText, 10);
              setMeasurement(size);
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
  );
};

export default TaperedLines;
