import React, { useReducer } from "react";
import classes from "./Mobile.module.css";
import Navigation from "./Navigation/Navigation";
import LogoSideTop from "./LogoSideTop/LogoSideTop";
import ActionZone from "./ActionZone/ActionZone";
import LogIn from "./Authentication/LogIn/LogIn";
import SignUp from "./Authentication/SignUp/SignUp";
import MessagingZone from "./MessagingZone/MessagingZone";
import { Switch, Route, useHistory } from "react-router-dom";
import openSocket from "socket.io-client";

const Mobile = () => {
  const reactRouterHistory = useHistory();
  const token = localStorage.getItem("token");
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
  const refreshToken = localStorage.getItem("refreshToken");
  const username = localStorage.getItem("username");

  const authState = useReducer((state) => state.authReducer);

  if (
    !token &&
    !tokenExpiresAt &&
    !refreshToken &&
    !username &&
    !authState.isLoggedin
  );
  reactRouterHistory.push("/login");

  const io = openSocket("https://rt-dev-chat-app.herokuapp.com", {
    transports: ["websocket"],
    upgrade: false,
  });

  return (
    <div className={classes.Mobile}>
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route path="/signup" exact component={SignUp} />

        <Route
          path="/messages/:friend"
          render={() => <MessagingZone io={io} />}
        />
        <Route path="/">
          <div className={classes.Mobile}>
            <LogoSideTop />
            <ActionZone io={io} />
            <Navigation />
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default Mobile;
