import { Alert } from 'react-native';

class AlertService {
  show(title?: string, message?: string) {
    Alert.alert(
      `${title ?? 'Alert'}`,
      `${message ?? 'Error, please try again'}`,
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  }
}
export default new AlertService();
