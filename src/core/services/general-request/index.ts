import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
} from 'axios';
import { GeneralRequestInterface } from './general-request.type';
import handleErrors from './handleErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL } from "@shared/endPoints";

class GeneralRequestService implements GeneralRequestInterface {
  static instance: GeneralRequestService;
  private httpService;

  constructor() {
    this.httpService = axios.create({
      baseURL: baseURL,
      timeout: 2500,
    });

    this.getToken().then(data => {
      this.httpService.defaults.headers.common['ttrak-key'] = data
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
        >(endpoint, data);
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

        this.saverToken<TypeResult>({
          ...(response.data as TypeResult),
          companyName: '',
          api_key: response.data.api_key,
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

  private async saverToken<TypeData>(
    data: TypeData & {api_key: string; companyName: string},
  ) {
    if (data) {
      this.httpService.defaults.headers.common['ttrak-key'] = data.api_key;
      await AsyncStorage.setItem('data_user', JSON.stringify(data));
    }
  }

  private async getToken(): Promise<string | undefined> {
    try {
      const data = await AsyncStorage.getItem('data_user');
      if (!data) return undefined;
      const dataParse = JSON.parse(data);
      return dataParse.api_key;
    } catch (e) {
      console.error(e);
    }
  }
}

export default GeneralRequestService.getInstance();
