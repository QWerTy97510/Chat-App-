import React, { useEffect } from "react";
import classes from "./LogoSideTop.module.css";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../../../store/actions/axiosBaseURL";

const LogoSideTop = () => {
  const history = useHistory();
  const authState = useSelector((state) => state.authReducer);

  const refreshToken = localStorage.getItem("refreshToken");
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");

  const logOutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();

    axios
      .get(`${baseUrl}/auth/logout`, {
        headers: { "Logout-Token": refreshToken },
      })
      .then((res) => {})
      .catch((err) => console.log(err));

    authState.isLoggedin = false;
    history.push("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${baseUrl}/auth/refreshToken/${refreshToken}`, {
          headers: { "Refresh-Token": refreshToken },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("tokenExpiresAt", res.data.tokenExpiresAt);
        })
        .catch((err) => console.log(err));
    }, tokenExpiresAt - 5 - Date.now());

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className={classes.LogoSideTop}>
      <h1>ChatApp</h1>
      <button onClick={(e) => logOutHandler(e)}>Log Out</button>
    </div>
  );
};

export default LogoSideTop;
