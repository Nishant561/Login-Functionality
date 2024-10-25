import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  appLoading: false,
  appError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state, action) => {
      state.appLoading = true;
    },
    signupSuccess: (state) => {
      state.appLoading = false;
    },
    signupFailure: (state, action) => {
      state.appLoading = false;
      state.appError = action.payload || false;
    },
    signinStart: (state) => {
      state.appLoading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.appLoading = false;
    },
    signinFailure: (state, action) => {
      state.appLoading = false;
    state.appError = action.payload || false;
    },

    frontsignOut:(state,action)=>{
      state.currentUser = null
    }
  },
});

export const {
  signupFailure,
  signupSuccess,
  signupStart,
  signinFailure,
  signinStart,
  signinSuccess,
  frontsignOut
} = userSlice.actions;

export default userSlice.reducer;
