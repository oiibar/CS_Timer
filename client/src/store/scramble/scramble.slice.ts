import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import scrambleGenerators from "@services/scramble/ScrambleGenerators.ts";

interface Scramble {
  type: string;
  scramble: string;
}

interface ScrambleState {
  scrambles: Scramble[];
  selectedType: string;
}

const initialState: ScrambleState = {
  scrambles: [
    {
      type: "3x3x3",
      scramble: scrambleGenerators["3x3x3"](),
    },
    {
      type: "2x2x2",
      scramble: scrambleGenerators["2x2x2"](),
    },
    {
      type: "4x4x4",
      scramble: scrambleGenerators["4x4x4"](),
    },
  ],
  selectedType: "3x3x3",
};

export const scrambleSlice = createSlice({
  name: "scramble",
  initialState,
  reducers: {
    setScramble: (state, action: PayloadAction<Scramble>) => {
      const index = state.scrambles.findIndex(s => s.type === action.payload.type);
      if (index !== -1) {
        state.scrambles[index] = action.payload;
      } else {
        state.scrambles.push(action.payload);
      }
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload; // payload type: string
    },
  },
});

export const { setScramble, setSelectedType } = scrambleSlice.actions;
export const selectScramble = (state: RootState) => state.scramble.scrambles;
export const selectSelectedType = (state: RootState) => state.scramble.selectedType;
export default scrambleSlice.reducer;
