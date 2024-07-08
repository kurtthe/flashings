import React from 'react';
import { Box, type InputProps } from '@ui/components';
import MaskInput from '@components/MaskInput';
import { Masks } from 'react-native-mask-input';

type Props = InputProps & {
  label: string;
};

const InputDate: React.FC<Props> = ({ onChangeText, ...rest }) => {
  return (
    <Box my="m">
      <MaskInput
        mask={Masks.DATE_DDMMYYYY}
        keyboardType="numeric"
        onChangeText={newText => onChangeText?.(newText)}
        {...rest}
      />
    </Box>
  );
};

export default InputDate;
