import React from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { palette } from '@theme';

type Props = {
  options: RadioButtonProps[];
  onChange: (newValues: string) => void;
  optionsSelected?: string;
  color?: string;
};

const RadioBottom: React.FC<Props> = ({
  options,
  onChange,
  optionsSelected,
  color = palette.primary500,
}) => {
  const radioButtonsOptions = React.useMemo(() => {
    return options.map(dataOption => ({ ...dataOption, color }));
  }, [options, color]);

  if (!radioButtonsOptions) return null;

  return (
    <RadioGroup
      radioButtons={radioButtonsOptions}
      onPress={onChange}
      selectedId={optionsSelected}
    />
  );
};

export default RadioBottom;
