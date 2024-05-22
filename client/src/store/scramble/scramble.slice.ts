// store/scramble/scrambleSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ScrambleState {
  scramble: string;
}

const initialState: ScrambleState = {
  scramble: "",
};

export const scrambleSlice = createSlice({
  name: "scramble",
  initialState,
  reducers: {
    setScramble: (state, action) => {
      state.scramble = action.payload;
    },
  },
});

export const { setScramble } = scrambleSlice.actions;

export const selectScramble = (state: RootState) => state.scramble.scramble;

export default scrambleSlice.reducer;
