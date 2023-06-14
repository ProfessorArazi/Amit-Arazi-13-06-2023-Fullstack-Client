import axios from "axios";
import { toast } from "react-toastify";

const toastErrorHandler = (error) => {
  // show error toastify

  toast.error(error || "Something went wrong, please try again later", {
    position: "top-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const autocompleteHandler = async (value) => {
  // get autocomplete data

  const data = await axios(
    `${process.env.REACT_APP_SERVER}/autocomplete/${value}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return data;
};

export const getCityDataHandler = async (option, metric) => {
  // fetching the data for the city and returning it.

  const data = await axios(
    `${process.env.REACT_APP_SERVER}/getCurrentWeather/${option.Key}`
  )
    .then((res) => {
      const result = res.data.weatherData[0];
      return {
        city: option.LocalizedName || option.city,
        metric: result.Temperature.Metric.Value,
        WeatherText: result.WeatherText,
        Key: option.Key,
      };
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return data;
};

export const signupHandler = async (data) => {
  //signup

  const result = await axios
    .post(`${process.env.REACT_APP_SERVER}/signup`, {
      ...data,
    })
    .then((res) => {
      const { token, userId } = res.data;
      const user = { token, userId };
      sessionStorage.setItem("user", JSON.stringify(user));
      return { user };
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return result;
};

export const loginHandler = async (data) => {
  //login

  const result = await axios
    .post(`${process.env.REACT_APP_SERVER}/login`, {
      ...data,
    })
    .then((res) => {
      const { token, userId, favorites } = res.data;
      const user = { token, userId };
      sessionStorage.setItem("user", JSON.stringify(user));
      return { user, favorites: JSON.parse(favorites) };
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return result;
};

export const addFavoriteHandler = async (user, newFavorite) => {
  // adding favorite

  const favorites = await axios
    .post(`${process.env.REACT_APP_SERVER}/favorites/new`, {
      token: user.token,
      userId: user.userId,
      newFavorite,
    })
    .then((res) => {
      return res.data.favorites;
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return favorites;
};

export const removeFavoriteHandler = async (user, favorite) => {
  // removing favorite

  const favorites = await axios
    .post(`${process.env.REACT_APP_SERVER}/favorites/delete`, {
      token: user.token,
      userId: user.userId,
      favoriteId: favorite.Key,
    })
    .then((res) => {
      return res.data.favorites;
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return favorites;
};

export const getFavoritesHandler = async (user) => {
  // getting user's favorites

  const favorites = await axios
    .post(`${process.env.REACT_APP_SERVER}/favorites`, {
      token: user.token,
      userId: user.userId,
    })
    .then((res) => {
      return res.data.favorites;
    })
    .catch((error) => toastErrorHandler(error.response?.data?.error));
  return favorites;
};
