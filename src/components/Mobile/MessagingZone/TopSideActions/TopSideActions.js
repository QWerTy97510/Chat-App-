import React, { useEffect } from "react";
import classes from "./TopSideActions.module.css";
import backArrowIcon from "../../../../icons/arrow-left-solid.svg";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const TopSideActions = () => {
  const { friend } = useParams();

  const refreshToken = localStorage.getItem("refreshToken");
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://localhost:8080/auth/refreshToken/${refreshToken}`, {
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
    <div className={classes.TopSideActions}>
      <div className={classes.TopSideActions__Back}>
        <NavLink to="/" activeClassName="noActiveClassName">
          <img src={backArrowIcon} alt="Back Arrow" />
        </NavLink>
      </div>
      <div className={classes.TopSideActions__MessagingWith}>
        <h3>{friend}</h3>
      </div>
    </div>
  );
};

export default TopSideActions;
