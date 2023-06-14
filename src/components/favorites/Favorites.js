import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../home/Home.css";
import "./Favorites.css";
import {
  setCurrentWeather,
  setFavorites,
} from "../../redux/slices/weatherData";
import { AiFillHeart } from "react-icons/ai";
import { setLoading } from "../../redux/slices/layout";
import { removeFavoriteHandler } from "../../http";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.weatherData.favorites);
  const theme = useSelector((state) => state.layout.theme);
  const currentWeather = useSelector(
    (state) => state.weatherData.currentWeather
  );
  const user = useSelector((state) => state.weatherData.user);

  const handleOptionClick = (option) => {
    // updating the currentWeather to the picked one

    dispatch(setCurrentWeather(option));
  };

  const removeFromFavorites = async () => {
    // removing the picked favorite and if there is another favorites im setting
    // the first one as the current

    dispatch(setLoading(true));
    const favorites = await removeFavoriteHandler(user, currentWeather);
    if (favorites.length > 0) {
      dispatch(setFavorites(favorites));
      handleOptionClick(favorites[0]);
    } else {
      dispatch(setFavorites([]));
      handleOptionClick({});
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <div className="home">
        <div className="input-and-desc">
          <h1 className="favorites-title">Favorites</h1>
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
                    <AiFillHeart
                      className="heaert-favorite"
                      color="red"
                      size={40}
                    />
                    <button
                      className={`${
                        theme === "dark" ? "remove-dark" : "remove"
                      }`}
                      onClick={removeFromFavorites}
                    >
                      Remove from favorites
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <ul
          className={`options favorite-options ${
            theme === "dark" ? "dark" : ""
          }`}
        >
          {favorites.length > 0 ? (
            favorites.map((option) => (
              <li key={option.Key} onClick={() => handleOptionClick(option)}>
                {option.city}
              </li>
            ))
          ) : (
            <p>Add favorites in home page</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Favorites;
