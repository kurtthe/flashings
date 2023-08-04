import React from 'react';
import { Box, Text } from '@ui/components';
import { KeyBoardNumber } from '@features/flashing/components/KeyBoardNumber';
import { LineSelectedType } from '@features/flashing/components/Board';

type Props = {
  onDone: (sizeLine: string) => void;
  point?: LineSelectedType;
};
const MeasurementLines: React.FC<Props> = ({ onDone, point }) => {
  const [measurement, setMeasurement] = React.useState('0');

  React.useEffect(() => {
    if (!point) return;
    setMeasurement(point.sizeLine);
  }, [point]);
  const handleDone = (newSizeLine: string) => {
    setMeasurement(newSizeLine);
    onDone(newSizeLine);
  };

  return (
    <Box p="s">
      <Text
        variant="subheadBold"
        textAlign="center"
        my="m">{`${measurement}in`}</Text>
      <KeyBoardNumber onChange={setMeasurement} onDone={handleDone} />
    </Box>
  );
};

export default MeasurementLines;
