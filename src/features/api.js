import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), 
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
    // getTasks: builder.query({
    //   query: () => ({
    //     url: '/tasks', 
    //     method: 'GET',
    //   }),
    //   providesTags: ['Tasks'],
    // }),
  }),
});

export const { useLoginQuery, useRegisterMutation, useGetTasksQuery } = api;
