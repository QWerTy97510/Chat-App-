import axios from "axios";
import {
  GET_FRIEND_REQUESTS_START,
  GET_FRIEND_REQUESTS_SUCCESS,
  GET_FRIEND_REQUESTS_ERROR,
} from "./actionTypes";
import baseURL from "./axiosBaseURL";

const getFriendsRequestStart = () => {
  return { type: GET_FRIEND_REQUESTS_START };
};

const getFriendsRequestSuccess = (data) => {
  return {
    type: GET_FRIEND_REQUESTS_SUCCESS,
    data: data.data.data,
  };
};

const getFriendsRequestError = (error) => {
  return { type: GET_FRIEND_REQUESTS_ERROR, error: error };
};

export const getFriendRequests = (user, token) => {
  return (dispatch) => {
    dispatch(getFriendsRequestStart());
    axios
      .get(`${baseURL}/friendRequest/getFR/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        dispatch(getFriendsRequestSuccess(data));
      })
      .catch((error) => dispatch(getFriendsRequestError(error)));
  };
};
