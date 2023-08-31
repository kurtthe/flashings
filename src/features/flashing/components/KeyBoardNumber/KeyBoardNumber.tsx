import React from 'react';
import { Box, Button, Icon, IconButton } from "@ui/components";
import {
  BUTTONS_KEYBOARD,
  NUMBER_REGEX,
} from '@features/flashing/components/KeyBoardNumber/types';
import { DeleteIcon } from "@assets/icons";

type Props = {
  onChange: (value: string) => void;
  onDone: (value: string) => void;
};
const KeyBoardNumber: React.FC<Props> = ({onChange, onDone}) => {
  const [currentValue, setCurrentValue] = React.useState('');

  React.useEffect(() => onChange && onChange(currentValue), [currentValue]);
  const handleChange = (digit: string) => {
    if (digit === 'done') {
      onDone && onDone(currentValue);
    }

    if (NUMBER_REGEX.test(digit)) {
      return setCurrentValue(prevState => prevState.concat(digit));
    }
    return setCurrentValue(prevState => prevState.slice(0, -1));
  };

  return (
    <Box flexDirection="row" justifyContent="space-between" px="s">
      <Box flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap">
        {BUTTONS_KEYBOARD.map(digit => (
          <>
            {
              digit === 'delete'? (
                <Box onPress={()=> handleChange(digit)} mx="xs" mt="s" backgroundColor="white" p="s" width={100} alignItems="center" justifyContent="center" borderColor="buttonBorder" borderWidth={1} borderRadius="s" minHeight={50}>
                  <IconButton onPress={()=> handleChange(digit)} icon={ <Icon as={DeleteIcon} size={32}  />} />
                </Box>
              ): (<Button
                onPress={() => handleChange(digit)}
                key={`button-${digit}`}
                variant={digit === '.'? "keyboardGray" :"keyboard"} >
                {digit}
              </Button>)
            }
          </>

        ))}
      </Box>

    </Box>
  );
};

export default KeyBoardNumber;
