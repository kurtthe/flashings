import { useMMKVStorage } from 'react-native-mmkv-storage';

import { Storage } from '@services';

export default <T>(key: string, initialValue: T) =>
  useMMKVStorage(key, Storage, initialValue);
