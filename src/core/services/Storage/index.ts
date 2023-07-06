import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemStorage = (key: string, value: string) => {
  return new Promise(async resolve => {
    await AsyncStorage.setItem(key, value);
    resolve('saved');
  });
};

export const getItemStorage = (key: string) => {
  return new Promise(async (resolve, reject) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      resolve(value);
    }
    reject('There was no saved data');
  });
};
