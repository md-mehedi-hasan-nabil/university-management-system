import { apiSlice } from '../api/apiSlice';
import { addCourses } from './coursesSlice';

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (data) => ({
        url: '/courses',
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
    editCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/${data?.id}`,
        method: 'PATCH',
        body: data.body,
      }),
      invalidatesTags: ['courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useSelectCourseForAdvisingMutation,
  useEditCourseMutation,
} = coursesApi;
