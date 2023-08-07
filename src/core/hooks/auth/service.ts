import { RequestService } from '@services/index';
import { LOGIN_REQUEST, LOGIN_RESPONSE } from '@models';
import { endPoints } from '@shared/endPoints';

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
  return Promise.resolve(loginResponse?.body);
};

export const forgotPasswordService = async (email: string) => {
  if (!email) {
    return Promise.reject('Email is required');
  }
  const response = await RequestService.post(endPoints.forgotPassword, {
    username: email,
  });

  return Promise.resolve(response?.body);
};
