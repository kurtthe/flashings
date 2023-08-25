import React from 'react';
import {Box, Button} from '@ui/components';
import {
  BUTTONS_KEYBOARD,
  BUTTONS_KEYBOARD2,
  NUMBER_REGEX,
} from '@features/flashing/components/KeyBoardNumber/types';

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
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="50%">
        {BUTTONS_KEYBOARD.map(digit => (
          <Button
            onPress={() => handleChange(digit)}
            key={`button-${digit}`}
            variant="keyboard">
            {digit}
          </Button>
        ))}
      </Box>
      <Box flexDirection="row" alignItems="center" flexWrap="wrap" width="40%">
        {BUTTONS_KEYBOARD2.map(digit => (
          <Button
            onPress={() => handleChange(digit)}
            key={`button-${digit}`}
            variant={
              digit === 'delete' || digit === 'done'
                ? 'keyboardBig'
                : 'keyboard'
            }>
            {digit}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default KeyBoardNumber;
