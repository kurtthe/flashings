import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import { GeneralRequestInterface } from './general-request.type';
import handleErrors from './handleErrors';
class GeneralRequestService implements GeneralRequestInterface {
  static instance: GeneralRequestService;
  private httpService;
  private tokeAuth: string | undefined;

  constructor() {
    this.httpService = axios;
  }
  static getInstance() {
    if (!GeneralRequestService.instance) {
      GeneralRequestService.instance = new GeneralRequestService();
    }
    return GeneralRequestService.instance;
  }

  get<TypeResult>(endpoint: string, options: AxiosRequestConfig<any> = {}) {
    return new Promise<{
      body: TypeResult;
      headers: Partial<AxiosResponseHeaders>;
    }>(async (resolve, reject) => {
      try {
        const response = await this.httpService.get<
          any,
          AxiosResponse<TypeResult>
        >(endpoint, {
          headers: { 'ttrak-key': this.tokeAuth || '' },
          ...options,
        });
        resolve({
          body: response.data as TypeResult,
          headers: response.headers,
        });
      } catch (err) {
        handleErrors.manage(err);
        return reject(err);
      }
    });
  }

  post<TypeResult, TypeData>(
    endpoint: string,
    data: TypeData,
    headersPetition = {},
  ) {
    return new Promise<{
      body: TypeResult;
      headers: Partial<AxiosResponseHeaders>;
    }>(async (resolve, reject) => {
      try {
        const response = await this.httpService.post<
          TypeData,
          AxiosResponse<TypeResult>
        >(endpoint, data, {
          headers: {
            ...headersPetition,
            'ttrak-key': this.tokeAuth || '',
          },
        });
        resolve({
          body: response.data as TypeResult,
          headers: response.headers,
        });
      } catch (err) {
        handleErrors.manage(err);
        reject(err);
      }
    });
  }

  put<TypeResult, TypeData>(endpoint: string, data: TypeData) {
    return new Promise<{
      body: TypeResult;
      headers: Partial<AxiosResponseHeaders>;
    }>(async (resolve, reject) => {
      try {
        const response = await this.httpService.put<
          TypeData,
          AxiosResponse<TypeResult>
        >(endpoint, data, {
          headers: {
            'ttrak-key': this.tokeAuth || '',
          },
        });
        resolve({
          body: response.data as TypeResult,
          headers: response.headers,
        });
      } catch (err) {
        handleErrors.manage(err);
        console.log('error post', err);
        reject(err);
      }
    });
  }

  auth<TypeResult, TypeData>(endpoint: string, data: TypeData) {
    return new Promise<{
      body: TypeResult;
      headers: Partial<AxiosResponseHeaders>;
    }>(async (resolve, reject) => {
      try {
        const response = await this.httpService.post<
          TypeData,
          AxiosResponse<TypeResult & { api_key: string }>
        >(endpoint, data);

        resolve({
          body: response.data as TypeResult,
          headers: response.headers,
        });
      } catch (err) {
        handleErrors.manage(err);
        reject(err);
      }
    });
  }
}

export default GeneralRequestService.getInstance();
