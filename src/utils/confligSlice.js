import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "eng",
  },
  reducers: {
    ChangeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { ChangeLanguage } = configSlice.actions;
export default configSlice.reducer;
