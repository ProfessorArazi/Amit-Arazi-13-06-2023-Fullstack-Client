import React, { useState } from "react";
import "./Login.css";
import { loginHandler, signupHandler } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavorites, setUser } from "../../redux/slices/weatherData";
import { setLoading } from "../../redux/slices/layout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.layout.theme);

  const [signup, setSignup] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const submitHandler = async (e) => {
    // calling the api for login or signup and
    // updating redux with the user data
    // after login im navigating to home page

    e.preventDefault();
    if (!values.username.trim() || !values.password.trim()) return;
    let data;
    dispatch(setLoading(true));
    if (signup) {
      data = await signupHandler(values);
    } else {
      data = await loginHandler(values);
      if (data?.favorites) dispatch(setFavorites(data.favorites));
    }
    if (data?.user) {
      dispatch(setUser(data.user));
      navigate("/");
    }
    dispatch(setLoading(false));
  };

  return (
    <div className={`login ${theme === "dark" ? "login-dark" : ""}`}>
      <h1 className="title login-title">Sign {signup ? "Up" : "In"}</h1>
      <form className="form login-form" onSubmit={submitHandler}>
        <input
          className="input"
          value={values.username}
          placeholder="user name"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          className="input"
          value={values.password}
          type="password"
          placeholder="password"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <h4
          onClick={() => setSignup((prev) => !prev)}
          className="title login-title change-mode"
        >
          Sign {signup ? "In" : "Up"}
        </h4>
        <div className="button-container">
          <button
            className={`${theme === "dark" ? "button-dark" : ""}`}
            disabled={!values.username.trim() || !values.password.trim()}
          >
            {signup ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
