import { CreateUserParams, User, UserCredentialsParams, CreateMessageParams } from './types';
import axios, { AxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'https://localhost:3000',
    'Content-Type': 'application/json',
  },
};
//'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = async (data: UserCredentialsParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () => axios.get(`${API_URL}/conversations`, config);

export const getConversationMessages = (id: number) =>
  axios.get(`${API_URL}/messages/${id}`, config);

export const postNewMessage = (data: CreateMessageParams) => {
  axios.post(`${API_URL}/messages`, data, config);
};

export const getTodo = (id: string) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`, config);
};
export const getMock = (data: any) => {
  return axios.get(`https://jsonplaceholder.typicode.com/todos/${data.id}`, config);
};

export const serviceApi = {
  getTodo,
  getMock,
};
