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
import {useAppDispatch} from '@hooks/useStore';
import {actions as flashingActions} from '@store/flashings/actions';
import {SIZE_ICON_PHONE, SIZE_ICON_TABLET} from '@theme';
import {config} from '@env/config';
import Toast from 'react-native-toast-message';

type Props = {
  onDone: (sizeLine: number, type: 'line' | 'angle') => void;
  dataLine?: LINE_SELECTED;
  onNext?: () => void;
  onPrevious?: () => void;
  disabledPrevious?: boolean;
  typeSelected: 'line' | 'angle';
};
const MeasurementLines: React.FC<Props> = ({
  onDone,
  dataLine,
  typeSelected,
  onNext,
  onPrevious,
  disabledPrevious = false,
}) => {
  const dispatch = useAppDispatch();
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
    if (measurement < config.minimumSizeLinesMM) {
      Toast.show({
        position: 'bottom',
        text1: `The line must be at least ${config.minimumSizeLinesMM} mm.`,
        type: 'info',
      });
      return;
    }
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
      <Box
        as={BaseTouchable}
        onPress={() => {
          handleDone(`${measurement}`);
          dispatch(
            flashingActions.changeStep({
              step: getIndexOfStepForName('end_type'),
            }),
          );
        }}
        position="absolute"
        bottom="105%"
        right="0%"
        backgroundColor="white"
        p={isTablet ? 's' : 'xs'}
        style={{
          zIndex: 1,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowColor: 'lightGray',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <Icon
          as={CompleteEditMeasurementsIcon}
          color="black"
          size={isTablet ? SIZE_ICON_TABLET + 15 : SIZE_ICON_PHONE}
        />
      </Box>

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
              {typeSelected === 'line' ? config.unitMeasurement : '°'}
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
