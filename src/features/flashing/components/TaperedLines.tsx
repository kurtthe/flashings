import React from 'react';
import { Text, TextInput } from 'react-native';
import { Box } from '@ui/components';
import { useKeyboardVisibility } from '@hooks/useKeyboardVisibility';
import { isAndroid } from '@shared/platform';

type Props = {
  idFlashingToCreate?: number;
};
const TaperedLines: React.FC<Props> = ({ idFlashingToCreate }) => {
  const inputRef = React.useRef<TextInput>(null);
  const [heightMeasurement, setHeightMeasurement] = React.useState(350);

  useKeyboardVisibility({
    onKeyboardDidShow: () => setHeightMeasurement(isAndroid ? 70 : 350),
    onKeyboardDidHide: () => setHeightMeasurement(200),
  });

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
      <Text>Tapered !!</Text>
    </Box>
  );
};

export default TaperedLines;
