import MMKVStorage from 'react-native-mmkv-storage';

const secureStorage = new MMKVStorage.Loader()
  .withInstanceID('fl-secure-storage')
  .withEncryption()
  .initialize();

export default secureStorage;
