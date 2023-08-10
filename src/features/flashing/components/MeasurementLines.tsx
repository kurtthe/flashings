import React from 'react';
import { Box, Text } from '@ui/components';
import { KeyBoardNumber } from '@features/flashing/components/KeyBoardNumber';
import { LINE_SELECTED } from '@features/flashing/components/Board';

type Props = {
  onDone: (sizeLine: number) => void;
  dataLine?: LINE_SELECTED;
};
const MeasurementLines: React.FC<Props> = ({ onDone, dataLine }) => {
  const [measurement, setMeasurement] = React.useState(0);

  React.useEffect(() => {
    if (!dataLine) return;
    setMeasurement(dataLine.sizeLine);
  }, [dataLine]);
  const handleDone = (newSizeLine: string) => {
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);
    onDone(size);
  };

  return (
    <Box p="s">
      <Text
        variant="subheadBold"
        textAlign="center"
        my="m">{`${measurement}in`}</Text>
      <KeyBoardNumber
        onChange={size => setMeasurement(parseInt(size))}
        onDone={handleDone}
      />
    </Box>
  );
};

export default MeasurementLines;
