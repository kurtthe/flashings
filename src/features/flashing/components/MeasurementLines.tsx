import React from 'react';
import {Box, Text} from '@ui/components';
import {KeyBoardNumber} from '@features/flashing/components/KeyBoardNumber';

type Props = {
  onDone: (sizeLine: number) => void;
};
const MeasurementLines: React.FC<Props> = ({onDone}) => {
  const [measurement, setMeasurement] = React.useState('0');

  const handleDone = (newSizeLine: string) => {
    setMeasurement(newSizeLine);
    onDone(parseFloat(newSizeLine));
  };

  return (
    <Box p="s">
      <Text
        variant="subheadBold"
        textAlign="center"
        my="m">{`${measurement}cm`}</Text>
      <KeyBoardNumber onChange={setMeasurement} onDone={handleDone} />
    </Box>
  );
};

export default MeasurementLines;
