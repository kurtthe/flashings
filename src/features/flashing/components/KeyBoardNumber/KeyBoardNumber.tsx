import React from 'react';
import { BaseTouchable, Box, Button, Icon, IconButton } from "@ui/components";
import {
  BUTTONS_KEYBOARD,
  NUMBER_REGEX,
} from '@features/flashing/components/KeyBoardNumber/types';
import { DeleteIcon } from "@assets/icons";
import { FlatList } from "react-native";

type Props = {
  onChange: (value: string) => void;
  currentValue: string;
  setCurrentValue:  React.Dispatch<React.SetStateAction<string>>
};
const KeyBoardNumber: React.FC<Props> = ({onChange, currentValue, setCurrentValue}) => {

  React.useEffect(() => {
    onChange && onChange(currentValue);
  }, [currentValue]);
  const handleChange = (digit: string) => {
    if (NUMBER_REGEX.test(digit)) {
      return setCurrentValue(prevState => prevState.concat(digit));
    }
    return setCurrentValue(prevState => prevState.slice(0, -1));
  };


  return (
    <Box alignItems="center" justifyContent="center">
      <FlatList
        numColumns={3}
        keyExtractor={(digit, index)=> `fragment-button-keyboard${digit}-${index}`}
        data={BUTTONS_KEYBOARD}
        renderItem={({item: digit, index})=> (
          <>
            {
              digit === 'delete'? (
                <Box as={BaseTouchable} key={`button-${digit}-${index}`} onPress={()=> handleChange(digit)} mx="xs" mt="s" backgroundColor="white" p="s" width={100} alignItems="center" justifyContent="center" borderColor="buttonBorder" borderWidth={1} borderRadius="s" minHeight={50}>
                  <IconButton  icon={ <Icon as={DeleteIcon} size={32}  />} />
                </Box>
              ): (
                  <Button
                    onPress={() => handleChange(digit)}
                    key={`button-${digit}-${index}`}
                    variant={digit === '.'? "keyboardGray" :"keyboard"} >
                    {digit}
                  </Button>
              )
            }
          </>
        )
        } />
    </Box>
  );
};

export default KeyBoardNumber;
