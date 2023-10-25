const baseURL = 'https://api.trak.co/';

export const endPoints = {
  login: `${baseURL}login`,
  forgotPassword: `${baseURL}reset-password`,
  getDataUser: `${baseURL}users/:id`
};
