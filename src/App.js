import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Favorites from "./components/favorites/Favorites";
import Header from "./components/layout/header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFavorites, setUser } from "./redux/slices/weatherData";
import { getFavoritesHandler } from "./http";
import LoadingSpinner from "./components/layout/loading/LoadingSpinner";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.weatherData.user);
  const loading = useSelector((state) => state.layout.loading);

  useEffect(() => {
    // check on first render if the user was logged in and if he was
    // im fetching his favorites data

    const userData = sessionStorage.getItem("user");

    const fetchUserFavorites = async (user) => {
      const favorites = await getFavoritesHandler(user);
      if (favorites) dispatch(setFavorites(favorites));
    };

    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
      fetchUserFavorites(user);
    }
  }, [dispatch]);
  return (
    // Routing

    <BrowserRouter>
      <ToastContainer />
      {loading && <LoadingSpinner />}
      <Header />
      <Routes>
        {user && <Route path="/favorites" element={<Favorites />} />}
        {!user && <Route path="/login" element={<Login />} />}
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
