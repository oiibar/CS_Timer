import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { User } from "types/types";

interface UserState {
  user: User | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"), // Load persisted user
  isAuth: !!localStorage.getItem("user"), // Check if user data exists
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem("user"); // Clear persisted user
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
