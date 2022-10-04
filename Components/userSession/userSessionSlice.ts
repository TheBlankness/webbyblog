import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface userState {
  user_id: number;
  token: String;
  islogin: boolean;
}

const initialState: userState = {
  user_id: -1,
  token: "none",
  islogin: false,
};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.islogin = false;
    },
    login: (state) => {
      state.islogin = true;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveusertoken: (state, action: PayloadAction<String>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, saveusertoken } = userSessionSlice.actions;

export const selectUserSession = (state: RootState) => state.userSession;

export default userSessionSlice.reducer;
