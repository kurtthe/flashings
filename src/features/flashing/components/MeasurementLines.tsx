import React from 'react';
import { Box, Button, Divider, Text } from "@ui/components";
import { KeyBoardNumber } from '@features/flashing/components/KeyBoardNumber';
import { LINE_SELECTED } from '@features/flashing/components/Board';
import { isNaN } from "lodash";

type Props = {
  onDone: (sizeLine: number) => void;
  dataLine?: LINE_SELECTED;
  onNext?: (sizeLine?: number) => void;
  onPrevious?: (sizeLine?: number) => void;
};
const MeasurementLines: React.FC<Props> = ({ onDone, dataLine, onNext, onPrevious }) => {
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
      <Box flexDirection="row" alignItems="center" justifyContent="space-around">
        <Button
          onPress={() => onPrevious && onPrevious(measurement)}
          variant="keyboard">
          {`<`}
        </Button>
        <Text
          variant="subheadBold"
          textAlign="center"
          my="m">{`${isNaN(measurement)? '0': measurement}mm`}</Text>
        <Button
          onPress={() => onNext && onNext(measurement)}
          variant="keyboard">
          {`>`}
        </Button>
      </Box>
      <Divider my="s" />
      <KeyBoardNumber
        onChange={size => setMeasurement(parseFloat(size))}
        onDone={handleDone}
      />
    </Box>
  );
};

export default MeasurementLines;
