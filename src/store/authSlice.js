import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  email: null,
  userId: null,
  user: null,
  userType: null,
  modules:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const {payload} = action
      state.isLoggedIn = true;
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.email = payload.email;
      state.userId = payload.user_id;
      state.userType = payload.user_type;
      state.user = {
        accessToken:payload.access_token,
        refreshToken:payload.refresh_token,
        email: payload.email,
        userId: payload.user_id,
        userType: payload.user_type, // Include userType in user object
      };
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("accessToken", payload.access_token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.email = null;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    rehydrate(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setModules(state, action){
      const {payload} = action
      state.modules = payload
    }
  },
});

// Export actions and reducer
export const { login, logout, rehydrate, setModules } = authSlice.actions;
export default authSlice.reducer;
