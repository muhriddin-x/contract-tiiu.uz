import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinflStore: [],
  userStore: [],
};

export const getDatas = createSlice({
  name: "getDatas",
  initialState,
  reducers: {
    setPinflStore: (state, action) => {
      state.pinflStore = action.payload;
    },
    userData: (state, action) => {
      state.userStore = action.payload;
    },
  },
});

export const { setPinflStore, userData } = getDatas.actions;

export default getDatas.reducer;
