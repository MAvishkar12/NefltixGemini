import { createSlice } from "@reduxjs/toolkit";

const useSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeuser: (state) => {
      return null;
    },
  },
});

export const { addUser, removeuser } = useSlice.actions;

export default useSlice.reducer;
