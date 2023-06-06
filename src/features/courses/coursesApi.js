import { apiSlice } from '../api/apiSlice';
import { addCourses } from './coursesSlice';

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (data) => ({
        url: '/api/courses',
      }),
      providesTags: ['courses'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addCourses(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getCourse: builder.query({
      query: (courseId) => ({
        url: `/api/courses/${courseId}`,
      })
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `/api/courses/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['courses'],
    }),
    editCourse: builder.mutation({
      query: (data) => ({
        url: `/api/courses/${data?.id}`,
        method: 'PATCH',
        body: data.body,
      }),
      invalidatesTags: ['courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useEditCourseMutation,
} = coursesApi;
