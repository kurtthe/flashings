import React from 'react';
import { BaseTouchable, Box, Divider, Icon,  Text } from "@ui/components";
import { LINE_SELECTED } from '@features/flashing/components/Board';
import { isNaN } from "lodash";
import { BackArrowIcon, CompleteEditMeasurementsIcon, NextArrowIcon } from "@assets/icons";
import { TextInput } from "react-native";
import { MODES_BOARD } from "@models";
import { getIndexOfStepForName } from "@features/flashing/utils";

type Props = {
  onDone: (sizeLine: number, type: 'line' | 'angle') => void;
  dataLine?: LINE_SELECTED;
  onNext?: () => void;
  onPrevious?: () => void;
  disabledPrevious?: boolean
  typeSelected: 'line' | 'angle';
  changeMode?: (newMode:number) => void;
};
const MeasurementLines: React.FC<Props> = ({ onDone, dataLine, typeSelected, onNext, onPrevious , disabledPrevious=true, changeMode}) => {
  const [measurement, setMeasurement] = React.useState(0);
  const inputRef = React.useRef<TextInput>(null)

  React.useEffect(() => {
    if (!dataLine) return;
    inputRef.current?.focus()
    if(typeSelected === 'line'){
      return setMeasurement(dataLine.sizeLine)
    }
    setMeasurement(dataLine.angle ?? 0)
  }, [dataLine, dataLine?.sizeLine, typeSelected]);
  const handleDone = (newSizeLine: string) => {
    const size = parseInt(newSizeLine, 10);
    setMeasurement(size);
    onDone(size, typeSelected);
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
    <>
      <Box
        as={BaseTouchable}
        onPress={()=> {
          handleDone(`${measurement}`)
          changeMode && changeMode(getIndexOfStepForName('end_type'))
        }}
        position="absolute"
        bottom="105%"
        right="0%"
        backgroundColor="white"
        p="xs"
        style={{zIndex: 1, shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowColor: 'lightGray',
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        }}>
        <Icon as={CompleteEditMeasurementsIcon} color="black" size={35} />
      </Box>

      <Box p="s" backgroundColor="white">
        <Box flexDirection="row" alignItems="center" justifyContent="space-around">
          <Box disabled={disabledPrevious} as={BaseTouchable} onPress={handlePrevious}>
            <Icon opacity={disabledPrevious? 0.3: 1} color="black" as={BackArrowIcon} size={22}  />
          </Box>

          <Text variant="subheadSecondary">{typeSelected === 'line'?'Length': 'Angle'}</Text>
          <Box flexDirection="row" alignItems="center">
              <TextInput
                ref={inputRef}
                inputMode="numeric"
                keyboardType="numeric"
                style={{textAlign: 'center', height: 30, width: 80, backgroundColor: 'white'}}
                value={`${isNaN(measurement)? '0': measurement}`}
                onChangeText={(newText: string)=> {
                  const baseValue = typeSelected === 'line'? dataLine?.sizeLine: dataLine?.angle
                  const newCharacters = newText.split( baseValue?.toString() ?? '')
                  if(newCharacters.length  > 1){
                    return setMeasurement(parseInt(newCharacters[1], 10))
                  }
                  setMeasurement(parseInt(newText, 10))
                }}
              />
            <Text variant="bodyBold">{typeSelected === 'line'? 'mm': '°'}</Text>
          </Box>

          <Box as={BaseTouchable} onPress={handleNext}>
            <Icon as={NextArrowIcon} size={22} color="black"  />
          </Box>
        </Box>
        <Divider my="s" />
      </Box>
    </>
  );
};

export default MeasurementLines;
