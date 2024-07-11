import React from 'react';
import { BaseTouchable, Box, Divider, Icon, Text } from '@ui/components';
import { useKeyboardVisibility } from '@hooks/useKeyboardVisibility';
import { isAndroid } from '@shared/platform';
import { useAppSelector } from '@hooks/useStore';
import { getDataFlashing } from '@store/jobs/selectors';
import { BackArrowIcon, NextArrowIcon } from '@assets/icons';
import { TextInput } from 'react-native';

type Props = {
  idFlashingToCreate?: number;
  jobId?: any;
};

const TaperedLines: React.FC<Props> = ({ idFlashingToCreate, jobId }) => {
  const [disabledPrevious, setDisabledPrevious] = React.useState(false);
  const dataFlashing = useAppSelector(state =>
    getDataFlashing(state, {
      idJob: jobId,
      idFlashing: idFlashingToCreate,
    }),
  );
  const inputRef = React.useRef<TextInput>(null);
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);

  useKeyboardVisibility({
    onKeyboardDidShow: () => setHeightMeasurement(isAndroid ? 70 : 350),
    onKeyboardDidHide: () => setHeightMeasurement(200),
  });

  const handleNext = () => {};
  const handlePrevious = () => {};

  if (!dataFlashing) {
    return null;
  }

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
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
              size={22}
            />
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
              value={'0'}
              onChangeText={(newText: string) => null}
            />
            <Text variant="bodyBold">mm</Text>
          </Box>

          <Box as={BaseTouchable} onPress={handleNext}>
            <Icon as={NextArrowIcon} size={22} color="black" />
          </Box>
        </Box>
        <Divider my="s" />
      </Box>
    </Box>
  );
};

export default TaperedLines;
