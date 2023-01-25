import { AxiosResponse } from 'axios';

export interface ACPayload {
  data: any;
  promise: () => Promise<AxiosResponse<any, any>>;
}
