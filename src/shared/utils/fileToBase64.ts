import RNFS from 'react-native-fs';

export const fileToBase64 = async (filePath: string) => {
	try {
		return await RNFS.readFile(filePath, 'base64');
	} catch (error) {
		console.error('Error reading file:', error);
		throw error;
	}
};
