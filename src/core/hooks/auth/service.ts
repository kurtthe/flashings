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

  const getDataCompany = await RequestService.get(endPoints.getDataUser.replace(':id', loginResponse.body.user.id.toString()))
  return Promise.resolve({...loginResponse.body, company: getDataCompany.headers['Tradetrak-Company']});
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
