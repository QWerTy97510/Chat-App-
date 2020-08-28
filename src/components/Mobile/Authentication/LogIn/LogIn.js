import React, { useState, useEffect } from "react";
import classes from "./LogIn.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions/index";
import validator from "validator";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameClass, setUsernameClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");

  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);

  const reactRouterHistory = useHistory();

  useEffect(() => {
    if (authState.isLoggedin) {
      localStorage.setItem("token", authState.data.data.token);
      localStorage.setItem(
        "tokenExpiresAt",
        authState.data.data.tokenExpiresAt
      );
      localStorage.setItem("refreshToken", authState.data.data.refreshToken);
      localStorage.setItem("username", authState.data.data.username);

      reactRouterHistory.push("/");
    } else {
      reactRouterHistory.push("/login");
    }
  }, [authState.isLoggedin, authState.data, reactRouterHistory]);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    const token = localStorage.getItem("token");

    dispatch(actions.login(data, token));
  };

  const validatingUsername = (e) => {
    setUsername(e.target.value);

    if (
      validator.isLength(e.target.value.trim(), { min: 6 }) &&
      validator.isAlphanumeric(e.target.value)
    ) {
      setUsernameClass("valid");
    } else {
      setUsernameClass("invalid");
    }
  };

  const validatingPassword = (e) => {
    setPassword(e.target.value);

    if (
      validator.isLength(e.target.value.trim(), { min: 6 }) &&
      validator.isAscii(e.target.value)
    ) {
      setPasswordClass("valid");
    } else {
      setPasswordClass("invalid");
    }
  };

  return (
    <div className={classes.LogIn}>
      <header>
        <h1>ChatApp</h1>
      </header>
      <div className={classes.LogInForm}>
        <div className={classes.LogInForm__Input}>
          <input
            type="text"
            onChange={(e) => validatingUsername(e)}
            className={usernameClass}
            placeholder="Username"
          />
        </div>
        <div className={classes.LogInForm__Input}>
          <input
            type="password"
            onChange={(e) => validatingPassword(e)}
            className={passwordClass}
            placeholder="Password"
          />
        </div>
        <div className={classes.LogInForm__Btn}>
          <button
            onClick={loginSubmitHandler}
            disabled={
              usernameClass === "valid" && passwordClass === "valid"
                ? false
                : true
            }
            className={
              usernameClass === "valid" && passwordClass === "valid"
                ? "activeBtn"
                : "inactiveBtn"
            }
          >
            Log In
          </button>
        </div>
      </div>
      <div className={classes.LogInTextZone}>
        <h3>Don't have an account?</h3>
        <NavLink to="/signup" exact>
          Create one
        </NavLink>
      </div>
    </div>
  );
};

export default LogIn;
