import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { setTheme } from "../../../redux/slices/layout";
import { setFavorites, setUser } from "../../../redux/slices/weatherData";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.layout.theme);
  const user = useSelector((state) => state.weatherData.user);

  const signoutHandler = () => {
    dispatch(setUser(null));
    dispatch(setFavorites([]));
    sessionStorage.removeItem("user");
  };

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  return (
    <>
      <div className={`navbar ${theme === "dark" ? "dark" : ""}`}>
        <div className="top">
          <h1>Weather Task</h1>
          <div className="navbar-buttons">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to={!user ? "/login" : "/favorites"} className="nav-link">
              Favorites
            </Link>
          </div>
        </div>
        <div className="actions">
          {theme === "light" ? (
            <BsFillSunFill
              onClick={() => dispatch(setTheme("dark"))}
              size={40}
              color="#FFD700"
            />
          ) : (
            <MdDarkMode
              size={40}
              onClick={() => dispatch(setTheme("light"))}
              className="dark-mode-icon"
            />
          )}
          {!user ? (
            <FaUserAlt
              onClick={() => navigate("/login")}
              size={36}
              color="#bcb6b6"
            />
          ) : (
            <FaSignOutAlt onClick={signoutHandler} size={36} color="#bcb6b6" />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
