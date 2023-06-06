import { apiSlice } from '../api/apiSlice';

export const studentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: (data) => ({
                url: '/api/student',
            }),
        }),
        getStudent: builder.query({
            query: (data) => ({
                url: `/api/student/${data?.studentId}`,
            }),
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/api/student/add-student',
                method: 'POST',
                body: data,
            }),
        }),
        selectedSection: builder.mutation({
            query: (data) => ({
                url: `/api/student/selected-section`,
                method: 'PATCH',
                body: data,
            }),
        }),
        removedSection: builder.mutation({
            query: (data) => ({
                url: `/api/student/removed-section`,
                method: 'PATCH',
                body: data,
            }),
        }),
    })
})


export const {
    useGetStudentsQuery, useGetStudentQuery, useAddStudentMutation, useSelectedSectionMutation, useRemovedSectionMutation
} = studentApi;