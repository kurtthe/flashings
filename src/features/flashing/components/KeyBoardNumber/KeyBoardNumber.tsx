import React from 'react';
import {Box, Button} from '@ui/components';
import {
  BUTTONS_KEYBOARD,
  BUTTONS_KEYBOARD2,
} from '@features/flashing/components/KeyBoardNumber/types';

const KeyBoardNumber = ({}) => {
  return (
    <Box flexDirection="row" justifyContent="center">
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="50%">
        {BUTTONS_KEYBOARD.map(digit => (
          <Button variant="keyboard" mx="xs" mt="s">
            {digit}
          </Button>
        ))}
      </Box>
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="40%">
        {BUTTONS_KEYBOARD2.map(digit => (
          <Button variant="keyboard">{digit}</Button>
        ))}
      </Box>
    </Box>
  );
};

export default KeyBoardNumber;
