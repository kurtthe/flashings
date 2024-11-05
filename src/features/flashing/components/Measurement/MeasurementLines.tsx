import React from 'react';
import {BaseTouchable, Box, Divider, Icon, Text} from '@ui/components';
import {isNaN} from 'lodash';
import {
  BackArrowIcon,
  CompleteEditMeasurementsIcon,
  NextArrowIcon,
} from '@assets/icons';
import {TextInput} from 'react-native';
import {getIndexOfStepForName} from '@features/flashing/utils';
import {isAndroid, isTablet} from '@shared/platform';
import {LINE_SELECTED} from '@features/flashing/components/Board/types';
import {useAppDispatch, useAppSelector} from '@hooks/useStore';
import {SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme';
import {boardActions} from '@store/board';
import {getTypeSelected} from '@store/board/selectors';
import IconButtonComplete from './IconButtonComplete';

type Props = {
  onDone: (sizeLine: number, type: 'line' | 'angle') => void;
  dataLine?: LINE_SELECTED;
  onNext?: () => void;
  onPrevious?: () => void;
  disabledPrevious?: boolean;
};
const MeasurementLines: React.FC<Props> = ({
  onDone,
  dataLine,
  onNext,
  onPrevious,
  disabledPrevious = false,
}) => {
  const typeSelected = useAppSelector(getTypeSelected);

  const [measurement, setMeasurement] = React.useState(0);
  const inputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (!dataLine) return;
    inputRef.current?.focus();
    if (typeSelected === 'line') {
      return setMeasurement(dataLine.sizeLine);
    }
    setMeasurement(dataLine.angle ?? 0);
  }, [dataLine, dataLine?.sizeLine, typeSelected]);
  const handleDone = (newSizeLine: string) => {
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);
    onDone(size, typeSelected);
  };
  const handlePrevious = () => {
    if (disabledPrevious) return;
    handleDone(`${measurement}`);
    onPrevious && onPrevious();
  };

  const handleNext = () => {
    handleDone(`${measurement}`);
    onNext && onNext();
  };

  const onChangeValue = (newText: string) => {
    const baseValue =
      typeSelected === 'line' ? dataLine?.sizeLine : dataLine?.angle;
    if (baseValue?.toString() === newText) {
      return setMeasurement(parseInt(newText, 10));
    }
    const newCharacters = newText.split(baseValue?.toString() ?? '');
    if (newCharacters.length > 1) {
      return setMeasurement(parseInt(newCharacters[1], 10));
    }
    setMeasurement(parseInt(newText, 10));
  };

  return (
    <>
      <IconButtonComplete onDone={() => handleDone(`${measurement}`)} />

      <Box p="s" backgroundColor="white">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around">
          <Box
            disabled={disabledPrevious}
            as={BaseTouchable}
            onPress={handlePrevious}>
            <Icon
              opacity={disabledPrevious ? 0.3 : 1}
              color="black"
              as={BackArrowIcon}
              size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
            />
          </Box>

          <Text variant="subheadSecondary">
            {typeSelected === 'line' ? 'Length' : 'Angle'}
          </Text>
          <Box flexDirection="row" alignItems="center">
            <TextInput
              ref={inputRef}
              inputMode="numeric"
              keyboardType="number-pad"
              style={[
                {
                  textAlign: 'center',
                  height: 30,
                  width: 80,
                  backgroundColor: 'white',
                  color: '#000',
                },
                isAndroid && {padding: 10, height: 40},
              ]}
              value={`${isNaN(measurement) ? '0' : measurement}`}
              onChangeText={onChangeValue}
            />
            <Text variant="bodyBold">
              {typeSelected === 'line' ? 'mm' : '°'}
            </Text>
          </Box>

          <Box as={BaseTouchable} onPress={handleNext}>
            <Icon
              as={NextArrowIcon}
              color="black"
              size={isTablet ? SIZE_ICON_TABLET : SIZE_ICON_PHONE}
            />
          </Box>
        </Box>
        <Divider my="s" />
      </Box>
    </>
  );
};

export default MeasurementLines;
