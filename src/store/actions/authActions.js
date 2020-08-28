import * as actionTypes from "./actionTypes";
import axios from "axios";
import baseURL from "./axiosBaseURL";

// SIGNUP

const authSignupStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START,
  };
};

const authSignupSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
    data: data,
  };
};

const authSignupEror = (err) => {
  return {
    type: actionTypes.AUTH_SIGNUP_ERROR,
    err: err,
  };
};

export const signup = (bodyData) => {
  return (dispatch) => {
    dispatch(authSignupStart());
    axios
      .post(`${baseURL}/auth/signup`, bodyData)
      .then((result) => {
        dispatch(authSignupSuccess(result));
      })
      .catch((err) => dispatch(authSignupEror(err)));
  };
};

// LOGIN

const authLoginStart = () => {
  return {
    type: actionTypes.AUTH_LOGIN_START,
  };
};

const authLoginSuccess = (data) => {
  return {
    type: actionTypes.AUTH_LOGIN_SUCCESS,
    data: data,
  };
};

const authLoginError = (err) => {
  return {
    type: actionTypes.AUTH_LOGIN_ERROR,
    err: err,
  };
};

export const login = (bodyData, token) => {
  return (dispatch) => {
    dispatch(authLoginStart());
    axios
      .post(`${baseURL}/auth/login`, bodyData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(authLoginSuccess(result));
      })
      .catch((err) => dispatch(authLoginError(err)));
  };
};
