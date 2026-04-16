import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptSearch: false,
  },
  reducers: {
    addtooggle: (state) => {
      state.gptSearch = !state.gptSearch;
    },
  },
});

export const { addtooggle } = gptSlice.actions;
export default gptSlice.reducer;
