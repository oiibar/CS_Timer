import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: !!localStorage.getItem("darkMode")
}

const themeSlice = createSlice({
    name: "mode",
    initialState: initialState,
    reducers: {
        setMode(state, value) {
            state.darkMode = value.payload
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
        }}})

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
