import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
  userInfo: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      state.userInfo = undefined;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, addUserInfo } = authSlice.actions;
export default authSlice.reducer;
