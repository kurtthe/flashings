import { STORE } from '@models';
import { OptionsType } from '@ui/components';

export const storesToOption = (data: STORE[]): OptionsType[] => {
  return data
    .map(store => ({
      value: store.id?.toString(),
      label: store.name,
      bgColor: '#fff',
      textColor: 'black',
      bold: false,
      disabled: false,
    }))
    .sort(sortByNameAsc);
};

const sortByNameAsc = (x: OptionsType, y: OptionsType) => {
  return x.label.localeCompare(y.label);
};
