import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../constants/api.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl:  BASE_API_URL }),
  tagTypes: ['User', 'Tasks'],
  endpoints: (builder) => ({
    login: builder.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getTasks: builder.query({
      query: () => ({
        url: '/tasks', 
        method: 'GET',
      }),
      providesTags: ['Tasks'],
    }),
    getTask: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`, 
        method: 'GET',
      }),
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useLoginQuery, useRegisterMutation, useGetTasksQuery, useGetTaskQuery } = api;
