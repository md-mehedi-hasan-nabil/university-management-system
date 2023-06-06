import { apiSlice } from '../api/apiSlice';
import { addUserInfo, userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getUser: builder.query({
      query: (data) => ({
        url: `/api/auth/register/${data.id}`,
      }),
      providesTags: ['userInfo'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const obj = { ...result?.data, id: result?.data?._id };
          delete obj._id;
          dispatch(addUserInfo(obj));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `/api/auth/register/`,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
       
          localStorage.setItem(
            'auth',
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addCourseAdvising: builder.mutation({
      query: (data) => ({
        url: `/api/auth/register/${data.userId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['courses', 'userInfo'],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update
        console.log(arg);
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getCourses', undefined, (draft) => {
            console.log(JSON.stringify(draft));

            const obj = {
              code: arg.code,
              faculty: arg.faculty,
              limit: arg.limit,
              title: arg.title,
            };
            // draft.selectedSections.push(obj);
            // const draftCourse = draft.find((c) => c._id === arg.id);
            // draftCourse.courseAdvising = arg.body.courseAdvising;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error(error);
        }
      },
    }),
    removeCourseAdvising: builder.mutation({
      query: (data) => ({
        url: `/api/auth/register/${data.userId}`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['courses'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useAddCourseAdvisingMutation,
  useRemoveCourseAdvisingMutation,
  useGetAllUserQuery,
} = authApi;
