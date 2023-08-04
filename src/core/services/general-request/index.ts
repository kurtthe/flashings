import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import { GeneralRequestInterface } from './general-request.type';
import { getItemStorage, setItemStorage } from '@services/Storage';
import { PROPERTIES_STORE_TYPE } from '@services/Storage/types';

class GeneralRequestService implements GeneralRequestInterface {
  static instance: GeneralRequestService;
  private httpService;
  private tokeAuth: string | undefined;

  constructor() {
    this.httpService = axios;
    this.getToken().then(data => {
      this.tokeAuth = data;
    });
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
        await this.saverToken<TypeResult>({
          ...(response.data as TypeResult),
          companyName: '',
          api_key: response.data.api_key,
        });

        resolve({
          body: response.data as TypeResult,
          headers: response.headers,
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private async saverToken<TypeData>(data: TypeData & { api_key: string }) {
    if (data) {
      this.tokeAuth = data.api_key;
      await setItemStorage(
        PROPERTIES_STORE_TYPE.DATA_USER,
        JSON.stringify(data),
      );
    }
  }

  private async getToken(): Promise<string | undefined> {
    try {
      const data = await getItemStorage(PROPERTIES_STORE_TYPE.DATA_USER);
      if (typeof data === 'string') {
        const dataParse = JSON.parse(data);
        return dataParse.api_key;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default GeneralRequestService.getInstance();
