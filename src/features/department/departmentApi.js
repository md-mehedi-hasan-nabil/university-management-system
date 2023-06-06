import { apiSlice } from '../api/apiSlice';

export const departmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: (data) => ({
                url: '/api/department',
            }),
        }),
        getDepartment: builder.query({
            query: (data) => ({
                url: `/api/department/${data?.id}`,
            }),
        }),
        addDepartment: builder.mutation({
            query: (data) => ({
                url: `/api/department/`,
                method: 'POST',
                body: data,
            }),
        }),
        editDepartment: builder.mutation({
            query: (data) => ({
                url: `/api/department/${data?.id}`,
                method: 'PATCH',
                body: data.body,
            }),
        }),
    }),
});

export const {
    useGetDepartmentsQuery, useGetDepartmentQuery, useAddDepartmentMutation, useEditDepartmentMutation
} = departmentApi;
