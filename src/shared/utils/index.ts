import RNFS from 'react-native-fs';

export const getRandomInt = (min:number = 0, max: number = 100): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export type KnowledgeDataState = {
  id: number;
  link: string;
  title: string;
  slug: string;
  imageUri: string;
};

export const isBase64 = (value: string) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

export const imageToBase64 = async (urlImage?: string) =>{
  if(!urlImage) return ''
  return await RNFS.readFile(urlImage, 'base64')
}

