import React from "react";
import classes from "./Navigation.module.css";
import friendsIcon from "../../../icons/user-friends-solid.svg";
import requestsIcon from "../../../icons/Group-3.svg";
import searchIcon from "../../../icons/search-solid.svg";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <NavLink to="/" exact>
        <div className={classes.IconDiv}>
          <img src={friendsIcon} alt="Friends Icon" />
        </div>
      </NavLink>
      <NavLink to="/friend-requests" exact>
        <div className={classes.IconDiv}>
          <img src={requestsIcon} alt="Requests Icon" />
        </div>
      </NavLink>
      <NavLink to="/search" exact>
        <div className={classes.IconDiv}>
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </NavLink>
    </div>
  );
};

export default Navigation;
