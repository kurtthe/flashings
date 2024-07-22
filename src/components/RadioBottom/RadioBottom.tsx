import React from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { palette } from '@theme';

type Props = {
  options: RadioButtonProps[];
  onChange: (newValues: string) => void;
  optionSelected?: string;
  color?: string;
};

export type Option = {
  value: string;
  id: string;
  label: string;
  selected?: boolean;
};

const RadioBottom: React.FC<Props> = ({
  options,
  onChange,
  optionSelected,
  color = palette.primary500,
}) => {
  const [optionsButton, setOptionsButton] = React.useState<Option[]>([]);

  React.useEffect(() => {
    const dataOptions: Option[] = options.map(dataOption => ({
      ...dataOption,
      color,
      selected: dataOption.selected === optionSelected,
    })) as any as Option[];
    setOptionsButton(dataOptions);
  }, [options, color, optionSelected]);

  if (!optionsButton) return null;

  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <RadioGroup
      radioButtons={optionsButton}
      onPress={handleChange}
      layout="row"
    />
  );
};

export default RadioBottom;
