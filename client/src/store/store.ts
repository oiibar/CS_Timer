import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@store/user/userSlice";
import scrambleReducer from "@store/scramble/scramble.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    scramble: scrambleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
