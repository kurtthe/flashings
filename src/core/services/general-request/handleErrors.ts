import alertService from './alert';

class HandleErrors {
  //@ts-ignore
  manage(error) {
    if (error.response?.status === 0) {
      this.showAlertOffline();
      return;
    }

    if (
      error.response?.status === 403 &&
      error.response.data.name == 'Forbidden'
    ) {
      console.log('RESTRICTED', error.response.request._url);
      return;
    }

    if (error.response?.status === 403) {
      this.showError(error, 'Alert!', 'Not Authenticated.');
      return;
    }

    this.showError(error.response);
  }

  showError(appError: any, title = 'Alert!', message?: string) {
    const description = message ? message : appError.data.message;
    alertService.show(title, description);
  }

  showAlertOffline() {
    alertService.show('Alert!', 'No connection internet.');
  }
}

export default new HandleErrors();
