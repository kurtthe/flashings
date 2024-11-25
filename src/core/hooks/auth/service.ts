import {RequestService} from '@services/index';
import {LOGIN_REQUEST, LOGIN_RESPONSE} from '@models';
import {endPoints} from '@shared/endPoints';

export const loginService = async ({
  username,
  password,
}: LOGIN_REQUEST): Promise<LOGIN_RESPONSE> => {
  const loginResponse = await RequestService.auth<
    LOGIN_RESPONSE,
    LOGIN_REQUEST
  >(endPoints.login, {
    username,
    password,
  });

  const urlUserView = endPoints.getDataUser.replace(
    ':id',
    loginResponse.body.user.id.toString(),
  );
  const getDataCompany = await RequestService.get(urlUserView, {
    headers: {
      'ttrak-key': loginResponse.body.api_key,
    },
  });
  return Promise.resolve({
    ...loginResponse.body,
    company: getDataCompany.headers['tradetrak-company'],
  });
};

export const forgotPasswordService = async (email: string) => {
  if (!email) {
    return Promise.reject(new Error('Email is required'));
  }
  const response = await RequestService.post(endPoints.forgotPassword, {
    username: email,
  });

  return Promise.resolve(response?.body);
};

export const loginDashboardService = async () => {
  const result = await RequestService.get(endPoints.loginDashboard, {
    params: {
      url: 'material-order/7011',
    },
  });
  return Promise.resolve(result?.body);
};
