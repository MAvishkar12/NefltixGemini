import { createSlice } from "@reduxjs/toolkit";

const geminislice = createSlice({
  name: "gemini",
  initialState: {
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    addMovieName: (state, action) => {
      state.movieNames = action.payload;
    },
    addMovieResults: (state, action) => {
      state.movieResults = action.payload;
    },
  },
});

export const { addMovieName, addMovieResults } = geminislice.actions;
export default geminislice.reducer;
