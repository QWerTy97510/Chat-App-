import React from "react";
import classes from "./ActionZone.module.css";
import FriendsZone from "./FriendsZone/FriendsZone";
import FriendRequestsZone from "./FriendRequestsZone/FriendRequestsZone";
import SearchZone from "./SearchZone/SearchZone";
import { Route, Switch } from "react-router-dom";

const ActionZone = ({ io }) => {
  return (
    <div className={classes.ActionZone}>
      <Switch>
        <Route path="/" exact component={FriendsZone} />
        <Route
          path="/friend-requests"
          exact
          render={() => <FriendRequestsZone io={io} />}
        />
        <Route path="/search" exact render={() => <SearchZone io={io} />} />
      </Switch>
    </div>
  );
};

export default ActionZone;
