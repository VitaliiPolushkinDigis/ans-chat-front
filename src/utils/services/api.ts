import {
  CreateMessageParams,
  CreateUserParams,
  UpdateMessageParams,
  UserCredentialsParams,
} from './../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    status: builder.query<any, any>({
      query: () => `auth/status`,
      providesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (data: CreateUserParams) => ({
        url: `auth/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation<any, any>({
      query: (data: UserCredentialsParams) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessagesByConversationId: builder.query<any, any>({
      query: (conversationId) => `messages/${conversationId}`,
      providesTags: ['Messages'],
    }),
    postMessage: builder.mutation({
      query: (data: CreateMessageParams) => ({
        url: `messages`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Messages'],
    }),
    updateMessage: builder.mutation({
      query: (data: UpdateMessageParams) => ({
        url: `messages`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const conversationsApi = createApi({
  reducerPath: 'conversationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getConversations: builder.query<any, any>({
      query: () => `conversations`,
    }),
  }),
});
export const profilesApi = createApi({
  reducerPath: 'profilesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<any, any>({
      query: () => `profiles`,
    }),
    getProfile: builder.query<any, any>({
      query: (profileId: number) => `profiles/${profileId}`,
    }),
  }),
});

export const { useGetConversationsQuery } = conversationsApi;
export const { useGetProfilesQuery, useGetProfileQuery, useLazyGetProfileQuery } = profilesApi;
export const { useRegisterMutation, useLoginMutation, useStatusQuery, useLazyStatusQuery } =
  authApi;
export const {
  useGetMessagesByConversationIdQuery,
  usePostMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
