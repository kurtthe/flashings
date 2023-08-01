import React from 'react';
import {Box, Text} from '@ui/components';
import {KeyBoardNumber} from '@features/flashing/components/KeyBoardNumber';

const MeasurementLines = ({}) => {
  const [measurement, setMeasurement] = React.useState('0');

  return (
    <Box p="s">
      <Text
        variant="subheadBold"
        textAlign="center"
        my="m">{`${measurement}cm`}</Text>
      <KeyBoardNumber onChange={setMeasurement} onDone={setMeasurement} />
    </Box>
  );
};

export default MeasurementLines;
