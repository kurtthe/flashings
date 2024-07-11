import React from 'react';
import { Text, TextInput } from 'react-native';
import { Box } from '@ui/components';
import { useKeyboardVisibility } from '@hooks/useKeyboardVisibility';
import { isAndroid } from '@shared/platform';
import { useAppSelector } from '@hooks/useStore';
import { getDataFlashing } from '@store/jobs/selectors';
import alert from '@services/general-request/alert';

type Props = {
  idFlashingToCreate?: number;
  jobId?: any;
};
const TaperedLines: React.FC<Props> = ({ idFlashingToCreate, jobId }) => {
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

  if (!dataFlashing) {
    alert.show('Error', 'Loading the data flashing.');
    return null;
  }

  return (
    <Box height={heightMeasurement} position="absolute" width="100%" bottom={0}>
      <Text>Tapered !!</Text>
    </Box>
  );
};

export default TaperedLines;
