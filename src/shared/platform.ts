import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export default Platform;
export const isTablet = DeviceInfo.isTablet();
export const hasNotch = DeviceInfo.hasNotch();
