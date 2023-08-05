import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemStorage = (key: string, value: string) => {
  return new Promise(async resolve => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    resolve('saved');
  });
};

export const getItemStorage = (key: string) => {
  return new Promise(async (resolve, reject) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      value.includes('{') ? JSON.parse(value) : value;
      resolve(value);
    }
    reject('There was no saved data');
  });
};

export const deleteItemStorage = (key: string) => {
  return new Promise(async resolve => {
    await AsyncStorage.removeItem(key);
    resolve('');
  });
};
