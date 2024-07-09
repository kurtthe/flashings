import React from 'react';
import { Box, type InputProps } from '@ui/components';
import MaskInput from '@components/MaskInput';
import { Masks } from 'react-native-mask-input';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from '@shared/utils/formatDate';

type Props = InputProps & {
  label: string;
};

const InputDate: React.FC<Props> = ({ onChangeText, ...rest }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [selectedDateText, setSelectedDateText] = React.useState<string>('');
  const formatted = 'DD/MM/YYYY';

  const handleConfirm = (date: Date) => {
    const dateText = formatDate(date, formatted);
    setSelectedDateText(dateText);
    showOrHideDatePicker(false);
  };

  const showOrHideDatePicker = (show: boolean = true) => {
    setIsDatePickerVisible(show);
  };

  return (
    <>
      <Box my="m">
        <MaskInput
          value={selectedDateText}
          onFocus={() => setIsDatePickerVisible(true)}
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="numeric"
          onChangeText={newText => {
            setSelectedDateText(newText);
            onChangeText?.(newText);
          }}
          {...rest}
        />
      </Box>

      <DateTimePicker
        date={selectedDate}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => showOrHideDatePicker(false)}
      />
    </>
  );
};

export default InputDate;
