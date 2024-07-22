import React from 'react';
import { FlatList, Text, View, TextStyle, ViewStyle } from 'react-native';
import Checkbox from 'react-native-check-box';

export type OptionCheckbox = {
  label: string;
  styleLabel?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
  checked: boolean;
};

export type PropsCheckbox = {
  options: OptionCheckbox[];
  colorChecked?: string;
  colorUnchecked?: string;
  onChange?: (optionSelected: string[]) => void;
  title: string;
  isRequired?: boolean;
  defaultValue?: string[];
};

const CheckboxComponent: React.FC<PropsCheckbox> = ({
  options,
  defaultValue = [],
  isRequired,
  title,
  onChange,
  colorChecked = '#1F3552',
  colorUnchecked = '#1F3552',
}) => {
  const [optionSelected, setOptionSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (defaultValue && Array.isArray(defaultValue)) {
      setOptionSelected(defaultValue);
    } else {
      setOptionSelected([]);
    }
  }, []);

  const changeSelected = (currentSelected: string) => {
    const indexIfIsSelected = optionSelected?.find(
      item => item === currentSelected,
    );
    let dataOptionsChanged = [...optionSelected];
    if (!indexIfIsSelected) {
      dataOptionsChanged.push(currentSelected);
    } else {
      dataOptionsChanged = dataOptionsChanged.filter(
        item => item !== currentSelected,
      );
    }
    setOptionSelected(dataOptionsChanged);
    onChange?.(dataOptionsChanged);
  };

  const renderItem = ({ item }: { item: OptionCheckbox }) => {
    return (
      <Checkbox
        onClick={() => changeSelected(item.label)}
        rightText={item.label}
        isChecked={optionSelected.includes(item.label)}
        disabled={item.disabled}
        checkBoxColor={colorChecked}
        uncheckedCheckBoxColor={colorUnchecked}
      />
    );
  };

  const memoizedValue = React.useMemo(
    () => renderItem,
    [optionSelected, options],
  );

  return (
    <View>
      <Text style={{}}>
        {title}
        {isRequired && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <FlatList
        data={options}
        renderItem={memoizedValue}
        keyExtractor={(item, index) => `checkbox-${item.label}-${index}`}
        scrollEnabled={false}
        nestedScrollEnabled={false}
      />
    </View>
  );
};

export default CheckboxComponent;
