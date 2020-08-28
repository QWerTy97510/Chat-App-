import React from "react";
import classes from "./FriendResult.module.css";

const FriendResult = (props) => {
  return (
    <div className={classes.FriendSearch}>
      <h3>{props.username}</h3>
      <button onClick={props.addFriend}>Add friend</button>
    </div>
  );
};

export default FriendResult;
