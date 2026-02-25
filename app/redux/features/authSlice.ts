import { createSlice } from "@reduxjs/toolkit";

// Auth slice = client state
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: null,
    isAuth: false,
  },

  reducers: {
    // Login ke baad call hota hai
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },

    // Logout
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
