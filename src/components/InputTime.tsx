import React from 'react';
import { Box, type InputProps } from '@ui/components';
import MaskInput from '@components/MaskInput';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate } from '@shared/utils/formatDate';
import { TimeIcon } from '@assets/icons';

type Props = InputProps & {
  label: string;
};

const TIME_MASK = [/\d/, /\d/, ':', /\d/, /\d/];

const InputTime: React.FC<Props> = ({ onChangeText, ...rest }) => {
  const [isTimePickerVisible, setIsTimePickerVisible] = React.useState(false);
  const [selectedTime, setSelectedTime] = React.useState<Date | undefined>(
    undefined,
  );
  const [selectedDateText, setSelectedDateText] = React.useState<string>('');
  const formatted = 'HH:mm ';

  const handleConfirm = (time: any) => {
    const dateText = formatDate(time, formatted);
    setSelectedDateText(dateText);
    showOrHideDatePicker(false);
  };

  const showOrHideDatePicker = (show: boolean = true) => {
    setIsTimePickerVisible(show);
  };

  return (
    <>
      <Box my="m" flexDirection="row">
        <MaskInput
          value={selectedDateText}
          onFocus={() => setIsTimePickerVisible(true)}
          keyboardType="number-pad"
          inputMode="numeric"
          mask={TIME_MASK}
          placeholder="HH:mm"
          icon={TimeIcon}
          onIcon={() => showOrHideDatePicker(true)}
          onChangeText={newText => {
            setSelectedDateText(newText);
            onChangeText?.(newText);
          }}
          {...rest}
        />
      </Box>

      <DateTimePicker
        date={selectedTime}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => showOrHideDatePicker(false)}
      />
    </>
  );
};

export default InputTime;
