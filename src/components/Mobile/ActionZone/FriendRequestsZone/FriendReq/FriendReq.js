import React from "react";
import classes from "./FriendReq.module.css";
import confirmIcon from "../../../../../icons/Group-13.svg";
import rejectIcon from "../../../../../icons/Group-14.svg";

const FriendReq = (props) => {
  return (
    <div className={classes.FriendRequest}>
      <h3>{props.user}</h3>
      <div className={classes.FriendResponse}>
        <a href="/" onClick={props.accept}>
          <img src={confirmIcon} alt="Confirm" />
        </a>
        <a href="/" onClick={props.reject}>
          <img src={rejectIcon} alt="Reject" />
        </a>
      </div>
    </div>
  );
};

export default FriendReq;
