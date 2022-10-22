import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  cashCourses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourses: (state, action) => {
      state.courses = action.payload;
      state.cashCourses = action.payload;
    },
    searchByKeyword: (state, action) => {
      state.courses = state.cashCourses.filter((course) =>
        course.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addCourses, searchByKeyword } = coursesSlice.actions;
export default coursesSlice.reducer;
