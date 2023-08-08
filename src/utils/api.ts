import axios, { AxiosRequestConfig } from 'axios';
import {
  ConversationType,
  CreateMessageParams,
  CreateUserParams,
  FetchMessagePayload,
  User,
  UserCredentialsParams,
} from './types';

export const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = async (data: UserCredentialsParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get<User>(`${API_URL}/auth/status`, config);

export const getConversations = () =>
  axios.get<ConversationType[]>(`${API_URL}/conversations`, config);

export const getConversationMessages = (id: number) =>
  axios.get<FetchMessagePayload>(`${API_URL}/messages/${id}`, config);

export const postNewMessage = (data: CreateMessageParams) => {
  axios.post(`${API_URL}/messages`, data, config);
};

export const API_AC_TYPES = {
  REQUESTED: '_REQUESTED',
  SUCCESSFUL: '_SUCCESSFUL',
  REJECTED: '_REJECTED',
};

const mock = {
  getConversations,
};

export default mock;
