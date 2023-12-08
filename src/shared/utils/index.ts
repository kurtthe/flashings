import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid } from "react-native";

export const getRandomInt = (min:number = 0, max: number = 100): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const downloadFile = async (url: string, filename: string) => {
  const imagePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`;

  const response =  await RNFetchBlob.config({
    fileCache: true,
    path: imagePath,
    appendExt: filename.split('.').pop(),
  }).fetch('GET', url);
  return response.path()
};

export const getDownloadPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED
};

export type KnowledgeDataState = {
  id: number;
  link: string;
  title: string;
  slug: string;
  imageUri: string;
};
