import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../store/actions/index";
import validator from "validator";
import backArrow from "../../../../icons/arrow-left-solid.svg";
import { NavLink, useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailClass, setEmailClass] = useState("");
  const [usernameClass, setUsernameClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const signupSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      username: username,
      password: password,
    };

    dispatch(actions.signup(data));

    history.push("/login");
  };

  const validatingEmail = (e) => {
    setEmail(e.target.value);

    if (validator.isEmail(e.target.value.trim())) {
      setEmailClass("valid");
    } else {
      setEmailClass("invalid");
    }
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
    <div className={classes.SignUp}>
      <header>
        <h1>ChatApp</h1>
      </header>
      <NavLink to="/login">
        <img src={backArrow} alt="Back" />
      </NavLink>
      <div className={classes.SignUpForm}>
        <div className={classes.SignUpForm__Input}>
          <input
            type="email"
            onChange={(e) => validatingEmail(e)}
            className={emailClass}
            placeholder="Email"
          />
        </div>
        <div className={classes.SignUpForm__Input}>
          <input
            type="text"
            onChange={(e) => validatingUsername(e)}
            className={usernameClass}
            placeholder="Username"
          />
        </div>
        <div className={classes.SignUpForm__Input}>
          <input
            type="password"
            onChange={(e) => validatingPassword(e)}
            className={passwordClass}
            placeholder="Password"
          />
        </div>
        <div className={classes.SignUpForm__Btn}>
          <button
            onClick={signupSubmitHandler}
            disabled={
              emailClass === "valid" &&
              usernameClass === "valid" &&
              passwordClass === "valid"
                ? false
                : true
            }
            className={
              emailClass === "valid" &&
              usernameClass === "valid" &&
              passwordClass === "valid"
                ? "activeBtn"
                : "inactiveBtn"
            }
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
