import React from "react";
import classes from "./Friend.module.css";
import rightArrow from "../../../../../icons/arrow-right-solid.svg";
import { NavLink } from "react-router-dom";

const Friend = (props) => {
  return (
    <div className={classes.Friend}>
      <h3>{props.friend}</h3>
      <NavLink to={`/messages/${props.friend}`}>
        <img src={rightArrow} alt="Right Arrow" />
      </NavLink>
    </div>
  );
};

export default Friend;
