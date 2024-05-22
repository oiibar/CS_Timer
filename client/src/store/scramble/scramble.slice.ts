// scrambleSlice.ts

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import generateScramble from "../../services/scramble.service";

interface ScrambleState {
  scramble: string;
}

const initialState: ScrambleState = {
  scramble: generateScramble(), // Generate the scramble on initial state
};

export const scrambleSlice = createSlice({
  name: "scramble",
  initialState,
  reducers: {
    setScramble: (state, action: PayloadAction<string>) => {
      state.scramble = action.payload;
    },
  },
});

export const { setScramble } = scrambleSlice.actions;
export const selectScramble = (state: RootState) => state.scramble.scramble;
export default scrambleSlice.reducer;
