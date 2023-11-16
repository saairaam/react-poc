import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROLE } from "../../Types";

export interface User {
  username: string;
  sub?: string;
  email?: string;
  gender?: string;
  name?: string;
  updated_at?: string;
  picture?: string;
  rememberMe: boolean;
  role: keyof typeof ROLE | string;
}
type AuthSliceState = (
  | { isAuthenticated: false; user: null }
  | { isAuthenticated: true; user: User }
) & {
  isInitializing: boolean;
};

const initialState = {
  isAuthenticated: false,
  user: null,
  isInitializing: true,
  cognitoUser: null,
} as AuthSliceState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signedIn: (state, event: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = event.payload;
      console.log(state.user);
    },
    signedOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    initializedAuthState: (state) => {
      state.isInitializing = false;
    },
  },
});

export const { signedIn, signedOut, initializedAuthState } = authSlice.actions;

export default authSlice.reducer;
