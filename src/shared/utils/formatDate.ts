import dayjs from 'dayjs';
//@ts-ignore
import utc from 'dayjs-plugin-utc';

//const DEFAULT_LOCALE = 'en-US';

dayjs.extend(utc);

export const formatDate = (
  value: dayjs.ConfigType | undefined,
  format = 'YYYY-MM-DD',
  inputFormat: string | undefined = undefined,
): string => dayjs(value, inputFormat).format(format);
