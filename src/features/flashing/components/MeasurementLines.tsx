import React from 'react';
import { Box,  Divider, Icon, IconButton, Text } from "@ui/components";
import { KeyBoardNumber } from '@features/flashing/components/KeyBoardNumber';
import { LINE_SELECTED } from '@features/flashing/components/Board';
import { isNaN } from "lodash";
import { BackArrowIcon,  NextArrowIcon } from "@assets/icons";

type Props = {
  onDone: (sizeLine: number) => void;
  dataLine?: LINE_SELECTED;
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean
};
const MeasurementLines: React.FC<Props> = ({ onDone, dataLine, onNext, onPrevious , showPrevious=false}) => {
  const [measurement, setMeasurement] = React.useState(0);
  const [currentValue, setCurrentValue] = React.useState('');

  React.useEffect(() => {
    if (!dataLine) return;

    setMeasurement(dataLine.sizeLine);
  }, [dataLine, dataLine?.sizeLine]);
  const handleDone = (newSizeLine: string) => {
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);
    setCurrentValue('')
    onDone(size);
  };
  const handlePrevious = () =>{
    handleDone(`${measurement}`)
    onPrevious && onPrevious()
  }
  const handleNext = () =>{
    handleDone(`${measurement}`)
    onNext && onNext()
  }

  return (
    <Box p="s" >
      <Box flexDirection="row" alignItems="center" justifyContent="space-around">
        {showPrevious &&<IconButton onPress={handlePrevious} icon={ <Icon as={BackArrowIcon} size={22}  />} /> }
        <Text variant="subheadSecondary">Length:</Text>
        <Box flexDirection="row" alignItems="center">
          <Box backgroundColor="white" px="m" py="xxs">
            <Text
              variant="subheadMedium"
            >{`${isNaN(measurement)? '0': measurement}`}</Text>
          </Box>
          <Text variant="bodyBold">mm</Text>
        </Box>
        <IconButton onPress={handleNext} icon={ <Icon as={NextArrowIcon} size={22}  />} />
      </Box>
      <Divider my="s" />
      <KeyBoardNumber
        setCurrentValue={setCurrentValue}
        currentValue={currentValue}
        onChange={size => setMeasurement(parseFloat(size))}
      />
    </Box>
  );
};

export default MeasurementLines;
