import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../constants/api.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  tagTypes: ['User', 'Tasks', 'Assignments', 'Materials'],
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
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    addAssignment: builder.mutation({
      query: (assignmentData) => ({
        url: '/assignments',
        method: 'POST',
        body: assignmentData,
      }),
      invalidatesTags: ['Assignments'],
    }),
    updateAssignment: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/assignments/${id}`,
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: ['Assignments'],
    }),
    getAssignmentsByTaskId: builder.query({
      query: (taskId) => ({
        url: `/assignments?taskId=${taskId}`,
        method: 'GET',
      }),
      providesTags: ['Assignments'],
    }),
    updateTaskAssignments: builder.mutation({
      query: ({ taskId, assignments }) => ({
        url: `/tasks/${taskId}`,
        method: 'PATCH',
        body: { assignments },
      }),
      invalidatesTags: ['Tasks'],
    }),
    getMaterials: builder.query({
      query: () => ({
        url: '/materials',
        method: 'GET',
      }),
      providesTags: ['Materials'],
    }),
    addComment: builder.mutation({
      query: ({ materialId, comments }) => ({
        url: `/materials/${materialId}`,
        method: 'PATCH',
        body: { comments },
      }),
      invalidatesTags: ['Materials'],
    }),
    addLikes: builder.mutation({
      query: ({ materialId, likes }) => ({
        url: `/materials/${materialId}`,
        method: 'PATCH',
        body: { likes },
      }),
      invalidatesTags: ['Materials'],
    }),
  }),
});

export const {
  useLoginQuery,
  useRegisterMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useGetUserByIdQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useGetAssignmentsByTaskIdQuery,
  useUpdateTaskAssignmentsMutation,
  useGetMaterialsQuery,
  useAddCommentMutation,
  useAddLikesMutation,
} = api;
