import React from 'react';
import { Box, Input, type InputProps } from '@ui/components';
import MaskInput from 'react-native-mask-input';

type Props = InputProps & {
  label?: string;
};

const InputTime: React.FC<Props> = ({ ...rest }) => {
  return (
    <Box>
      <Input as={MaskInput} {...rest} />
    </Box>
  );
};

export default InputTime;
