import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  currentWeather: {},
  user: null,
};

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setFavorites, removeFavorite, setCurrentWeather, setUser } =
  weatherDataSlice.actions;

export default weatherDataSlice.reducer;
