import {AxiosError, AxiosResponse} from 'axios';
import alertService from './alert';

class HandleErrors {
  manage(error: AxiosError) {
    const status = error.response?.status;
    const messageError = error.response?.data?.message || 'An error occurred.';

    switch (status) {
      case 0:
        this.showAlertOffline();
        break;
      case 500:
        this.showError(error.response, 'Server Error', messageError);
        break;
      default:
        this.showError(error.response, 'Alert!', messageError);
    }
  }

  showError(
    appError: AxiosResponse | undefined,
    title = 'Alert!',
    message = 'Something went wrong.',
  ) {
    const description = message || appError?.data?.message || 'Unknown error';
    alertService.show(title, description);
  }

  showAlertOffline() {
    alertService.show('Alert!', 'No internet connection.');
  }
}

export default new HandleErrors();
