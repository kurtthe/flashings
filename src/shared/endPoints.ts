import {config} from '@env/config';

export const baseURL = config.baseUrl;
export const baseUrlPDF = config.baseUrlPdf;

export const endPoints = {
  login: `/login`,
  forgotPassword: `/reset-password`,
  getDataUser: `/users/:id`,
  getStores: `/burdens/stores`,
  createJobAndFlashing: 'https://dash-stage.paperplane.app/generate',
  getBalance: `/burdens/balance`,
  getSupplier: `/burdens/supplier`,
  createMaterialOrder: `/material-orders`,
  shareMaterialOrder: `/material-orders/:id/share`,
  orderValidations: `/burdens/validation-rules`,
  getVersionApp: `/app-version/burdens-flashings-app`,
  loginDashboard: `/dashboard`,
  addJobFile: `/jobs/25/files/upload`,
};
