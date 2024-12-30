import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Role {
  ADMIN,
  MODERATOR,
  MEMBER,
  GUEST,
  ALUMNI,
}

export interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
