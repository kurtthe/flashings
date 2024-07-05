import React from 'react';
import { Box, Input } from '@ui/components';
import MaskInput from 'react-native-mask-input';

type Props = {
  onChange?: (text: string) => void;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
};

const InputTime: React.FC<Props> = () => {
  return (
    <Box>
      <Input as={MaskInput} />
    </Box>
  );
};

export default InputTime;
