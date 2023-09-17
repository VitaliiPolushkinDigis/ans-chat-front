import {
  ConversationMessage,
  CreateConversationParams,
  CreateMessageParams,
  CreateUserParams,
  UpdateMessageParams,
  UserCredentialsParams,
  UserWithoutPassword,
} from './../types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define your response and query parameter types

/* type QueryParams = {
  profileId: number; // Define the query parameters and their types
}; */

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
    status: builder.query<UserWithoutPassword, void>({
      query: () => `auth/status`,
      providesTags: ['Auth'],
    }),
    register: builder.mutation<void, CreateUserParams>({
      query: (data) => ({
        url: `auth/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    login: builder.mutation({
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
    getMessagesByConversationId: builder.query<ConversationMessage[], { conversationId: number }>({
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
  tagTypes: ['Conversations'],
  endpoints: (builder) => ({
    getConversations: builder.query<any, any>({
      query: () => `conversations`,
      providesTags: ['Conversations'],
    }),
    postConversation: builder.mutation({
      query: (data: CreateConversationParams) => ({
        url: `conversations`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Conversations'],
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
export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getProfilePosts: builder.query<any[], number>({
      query: (id: number) => `posts/profile/${id}`,
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation<{ title: string }, any>({
      query: (data: any) => ({
        url: `posts`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: 'include',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserWithoutPassword[], void>({
      query: () => `users`,
    }),
    getUser: builder.query<UserWithoutPassword[], number>({
      query: (id: number) => `users/${id}`,
    }),
  }),
});

export const { useGetConversationsQuery, usePostConversationMutation } = conversationsApi;
export const { useGetProfilePostsQuery, useCreatePostMutation, useLazyGetProfilePostsQuery } =
  postsApi;
export const { useGetProfilesQuery, useGetProfileQuery, useLazyGetProfileQuery } = profilesApi;
export const { useRegisterMutation, useLoginMutation, useStatusQuery, useLazyStatusQuery } =
  authApi;
export const {
  useGetMessagesByConversationIdQuery,
  usePostMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
export const { useGetUsersQuery, useGetUserQuery } = usersApi;
