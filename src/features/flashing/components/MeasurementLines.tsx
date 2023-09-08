import React from 'react';
import { BaseTouchable, Box, Divider, Icon,  Text } from "@ui/components";
import { KeyBoardNumber } from '@features/flashing/components/KeyBoardNumber';
import { LINE_SELECTED } from '@features/flashing/components/Board';
import { isNaN } from "lodash";
import { BackArrowIcon,  NextArrowIcon } from "@assets/icons";
import { Keyboard, TextInput, TouchableWithoutFeedback } from "react-native";

type Props = {
  onDone: (sizeLine: number) => void;
  dataLine?: LINE_SELECTED;
  onNext?: () => void;
  onPrevious?: () => void;
  disabledPrevious?: boolean
  handleInput?: (visibleKeyBoard: boolean)=> void;
};
const MeasurementLines: React.FC<Props> = ({ onDone, dataLine, onNext, onPrevious ,handleInput, disabledPrevious=true}) => {
  const [measurement, setMeasurement] = React.useState(0);
  const [currentValue, setCurrentValue] = React.useState('');
  const inputRef = React.useRef(null)

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
    if(disabledPrevious) return

    handleDone(`${measurement}`)
    onPrevious && onPrevious()
  }
  const handleNext = () =>{
    handleDone(`${measurement}`)
    onNext && onNext()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box p="s" >
        <Box flexDirection="row" alignItems="center" justifyContent="space-around">
          <Box disabled={disabledPrevious} as={BaseTouchable} onPress={handlePrevious}>
            <Icon opacity={disabledPrevious? 0.3: 1} as={BackArrowIcon} size={22}  />
          </Box>
          <Text variant="subheadSecondary">Length:</Text>
          <Box flexDirection="row" alignItems="center">
              <TextInput
                ref={inputRef}
                inputMode="numeric"
                keyboardType="numeric"
                onFocus={() => handleInput && handleInput(true)}
                onBlur={() => handleInput  && handleInput(false)}
                style={{textAlign: 'center', height: 30, width: 80, backgroundColor: 'white'}}
                onChangeText={(newText: string)=> setCurrentValue(newText)}
                value={`${isNaN(measurement)? '0': measurement}`}
              />
            <Text variant="bodyBold">mm</Text>
          </Box>
          <Box as={BaseTouchable} onPress={handleNext}>
            <Icon as={NextArrowIcon} size={22}  />
          </Box>
        </Box>
        <Divider my="s" />
        <KeyBoardNumber
          setCurrentValue={setCurrentValue}
          currentValue={currentValue}
          onChange={size => setMeasurement(parseFloat(size))}
        />
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default MeasurementLines;
