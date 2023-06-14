import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import {
  addFavoriteHandler,
  autocompleteHandler,
  getCityDataHandler,
  removeFavoriteHandler,
} from "../../http";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentWeather,
  setFavorites,
} from "../../redux/slices/weatherData";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../redux/slices/layout";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.weatherData.favorites);
  const currentWeather = useSelector(
    (state) => state.weatherData.currentWeather
  );
  const theme = useSelector((state) => state.layout.theme);
  const user = useSelector((state) => state.weatherData.user);

  const inputRef = useRef(null);

  const [autocomplete, setAutoComplete] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleInputChange = async () => {
    //  calling the autocomplete api

    const value = inputRef.current.value;

    // if the value is empty im not calling the api

    if (!value.trim()) return setAutoComplete([]);
    dispatch(setLoading(true));
    const data = await autocompleteHandler(value);
    if (data) setAutoComplete(data);
    dispatch(setLoading(false));
  };

  const handleOptionClick =
    // updating currentWeather with data from the api

    async (option) => {
      dispatch(setLoading(true));
      const data = await getCityDataHandler(option);
      if (data) dispatch(setCurrentWeather(data));
      dispatch(setLoading(false));
    };

  const addToFavoritesHandler = async () => {
    // if the user not logged in in navigating him to login page
    // else im adding favorite

    if (!user) {
      navigate("/login");
    } else {
      dispatch(setLoading(true));
      const favorites = await addFavoriteHandler(user, currentWeather);
      if (favorites) dispatch(setFavorites(favorites));
      dispatch(setLoading(false));
    }
  };

  const removeFromFavoritesHandler = async () => {
    // removing favorite

    dispatch(setLoading(true));
    const favorites = await removeFavoriteHandler(user, currentWeather);
    if (favorites) dispatch(setFavorites(favorites));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    // when the city changes im checking if the city in the favorites list

    setIsFavorite(
      favorites.some((favorite) => favorite.Key === currentWeather.Key)
    );
  }, [favorites, currentWeather.Key]);

  return (
    <div className="home">
      <div className="input-and-desc">
        <div className={`input-container ${theme === "dark" ? "dark" : ""}`}>
          <button onClick={handleInputChange}>Search</button>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a location"
            className={`input ${autocomplete ? "input-border-top" : ""} ${
              theme === "dark" ? "dark" : ""
            }`}
          />
        </div>
        <div className="body">
          {currentWeather.Key && (
            <div className={`container ${theme === "dark" ? "dark" : ""}`}>
              <div className="header">
                <div className="weather-data">
                  <h2>{currentWeather.city}</h2>
                  <div className="header-description">
                    <p>{currentWeather.metric}°C</p>
                    <p>{currentWeather.WeatherText}</p>
                  </div>
                </div>
                <div className="header-buttons">
                  {isFavorite ? (
                    <AiFillHeart
                      onClick={removeFromFavoritesHandler}
                      color="red"
                      size={40}
                    />
                  ) : (
                    <AiOutlineHeart onClick={addToFavoritesHandler} size={40} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {autocomplete && (
        <ul className={`options ${theme === "dark" ? "dark" : ""}`}>
          {autocomplete.length === 0 ? (
            <p>No search results found</p>
          ) : (
            autocomplete.map((option) => (
              <li key={option.Key} onClick={() => handleOptionClick(option)}>
                {option.LocalizedName}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Home;
