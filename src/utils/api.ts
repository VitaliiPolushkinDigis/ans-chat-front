import { CreateUserParams, User, UserCredentialsParams } from './types';
import axios, { AxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const config: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
};

export const postRegisterUser = async (data: CreateUserParams) =>
  axios.post(`${API_URL}/auth/register`, data, config);

export const postLoginUser = async (data: UserCredentialsParams) =>
  axios.post(`${API_URL}/auth/login`, data, config);

export const getAuthUser = () => axios.get<User>(`${API_URL}/auth/status`, config);
