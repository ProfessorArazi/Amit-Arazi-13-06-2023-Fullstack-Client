import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  loading: false,
};

const imageDataSlice = createSlice({
  name: "layoutData",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      // setting theme to dark or light

      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      // setting loading mode

      state.loading = action.payload;
    },
  },
});

export const { setTheme, setLoading } = imageDataSlice.actions;
export default imageDataSlice.reducer;
