import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    topRated: null,
    popular: null,
    upcoming: null,
  },
  reducers: {
    addNowPlayingMovie: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTopRatedMovie: (state, action) => {
      state.topRated = action.payload;
    },
    addPopularMovie: (state, acion) => {
      state.popular = acion.payload;
    },
    addUpcomingMovie: (state, action) => {
      state.upcoming = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addNowPlayingMovie,
  addTrailerVideo,
  addTopRatedMovie,
  addPopularMovie,
  addUpcomingMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
