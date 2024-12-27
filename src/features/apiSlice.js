import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), 
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users', 
        method: 'POST',
        body: userData,
      }),
    }),
    loginUser: builder.query({
      query: (credentials) => ({
        url: `/users?email=${credentials.email}&password=${credentials.password}`,  
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserQuery, 
} = apiSlice;
