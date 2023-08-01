import React from 'react';
import {Box, Button} from '@ui/components';
import {
  BUTTONS_KEYBOARD,
  BUTTONS_KEYBOARD2,
} from '@features/flashing/components/KeyBoardNumber/types';
import Feather from 'react-native-vector-icons/Feather';
import BaseTouchable from '@ui/components/BaseTouchable';
const KeyBoardNumber = ({}) => {
  return (
    <Box flexDirection="row" justifyContent="center">
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="50%">
        {BUTTONS_KEYBOARD.map(digit => (
          <Button textColor="black" key={`button-${digit}`} variant="keyboard">
            {digit}
          </Button>
        ))}
      </Box>
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="40%">
        {BUTTONS_KEYBOARD2.map(digit => (
          <Button
            textColor="black"
            key={`button-${digit}`}
            variant={
              digit === 'del' || digit === 'done' ? 'keyboardBig' : 'keyboard'
            }>
            {digit}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default KeyBoardNumber;
