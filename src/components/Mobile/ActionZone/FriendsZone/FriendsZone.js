import React, { useEffect } from "react";
import classes from "./FriendsZone.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../store/actions/index";
import Friend from "./Friend/Friend";

const FriendsZone = () => {
  const friendsState = useSelector((state) => state.friendsReducer);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(actions.getFriends(token));
  }, [token, dispatch]);

  let displayFriends = <h2>No friends here...</h2>;

  if (friendsState.data.length > 0) {
    displayFriends = friendsState.data.map((friend) => {
      return <Friend friend={friend} key={friend} />;
    });
  }

  return <div className={classes.FriendsZone}>{displayFriends}</div>;
};

export default FriendsZone;
