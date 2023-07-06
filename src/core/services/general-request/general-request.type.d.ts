import {AxiosResponseHeaders} from 'axios';

export interface GeneralRequestInterface {
  get<TypeResult>(
    endpoint: string,
  ): Promise<
    {body: TypeResult; headers: Partial<AxiosResponseHeaders>} | undefined
  >;

  auth<TypeResult, TypeData>(
    endpoint: string,
    data: TypeData,
  ): Promise<
    {body: TypeResult; headers: Partial<AxiosResponseHeaders>} | undefined
  >;

  post<TypeResult, TypeData>(
    endpoint: string,
    data: TypeData,
  ): Promise<
    {body: TypeResult; headers: Partial<AxiosResponseHeaders>} | undefined
  >;

  put<TypeResult, TypeData>(
    endpoint: string,
    data: TypeData,
  ): Promise<
    {body: TypeResult; headers: Partial<AxiosResponseHeaders>} | undefined
  >;
}
