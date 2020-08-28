import * as actiontypes from "./actionTypes";
import axios from "axios";
import baseURL from "./axiosBaseURL";

// GET FRIENDS

const getFriendsStart = () => {
  return { type: actiontypes.GET_FRIENDS_START };
};

const getFriendsSuccess = (data) => {
  return {
    type: actiontypes.GET_FRIENDS_SUCCESS,
    data: data.data,
  };
};

const getFriendsError = (error) => {
  return {
    type: actiontypes.GET_FRIENDS_ERROR,
    error: error,
  };
};

export const getFriends = (token) => {
  return (dispatch) => {
    dispatch(getFriendsStart());
    axios
      .get(`${baseURL}/friends`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getFriendsSuccess(result));
      })
      .catch((error) => dispatch(getFriendsError(error)));
  };
};

// SEARCH FRIENDS

const searchFriendsStart = () => {
  return { type: actiontypes.SEARCH_FRIENDS_START };
};

const searchFriendsSuccess = (searchResult) => {
  return {
    type: actiontypes.SEARCH_FRIENDS_SUCCESS,
    searchResult: searchResult.data.users,
  };
};

const searchFriendsError = (error) => {
  return {
    type: actiontypes.SEARCH_FRIENDS_ERROR,
    errorSearch: error,
  };
};

export const search = (value) => {
  return (dispatch) => {
    dispatch(searchFriendsStart());
    axios
      .get(`${baseURL}/search/${value}`)
      .then((data) => {
        dispatch(searchFriendsSuccess(data));
      })
      .catch((error) => dispatch(searchFriendsError(error)));
  };
};

// SEND FRIEND REQUEST

const addFriendStart = () => {
  return {
    type: actiontypes.ADD_FRIEND_START,
  };
};

const addFriendSuccess = () => {
  return {
    type: actiontypes.ADD_FRIEND_SUCCESS,
  };
};

const addFriendError = (error) => {
  return {
    type: actiontypes.ADD_FRIEND_ERROR,
    error: error,
  };
};

export const addFriend = (requestTo, token) => {
  return (dispatch) => {
    dispatch(addFriendStart());
    axios
      .get(`${baseURL}/friendRequest/send/${requestTo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(addFriendSuccess());
      })
      .catch((error) => {
        dispatch(addFriendError(error));
      });
  };
};

// ACCEPT FRIEND REQUEST

const acceptFriendStart = () => {
  return {
    type: actiontypes.ACCEPT_FRIEND_START,
  };
};

const acceptFriendSuccess = () => {
  return {
    type: actiontypes.ACCEPT_FRIEND_SUCCESS,
  };
};

const acceptFriendError = (error) => {
  return {
    type: actiontypes.ACCEPT_FRIEND_ERROR,
    error: error,
  };
};

export const acceptFriend = (requestTo, token) => {
  return (dispatch) => {
    dispatch(acceptFriendStart());
    axios
      .get(`${baseURL}/friendRequest/accept/${requestTo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(acceptFriendSuccess());
      })
      .catch((error) => {
        dispatch(acceptFriendError(error));
      });
  };
};

// REJECT FRIEND REQUEST

const rejectFriendStart = () => {
  return {
    type: actiontypes.REJECT_FRIEND_START,
  };
};

const rejectFriendSuccess = () => {
  return {
    type: actiontypes.REJECT_FRIEND_SUCCESS,
  };
};

const rejectFriendError = (error) => {
  return {
    type: actiontypes.REJECT_FRIEND_ERROR,
    error: error,
  };
};

export const rejectFriend = (requestTo, token) => {
  return (dispatch) => {
    dispatch(rejectFriendStart());
    axios
      .get(`${baseURL}/friendRequest/reject/${requestTo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(rejectFriendSuccess());
      })
      .catch((error) => {
        dispatch(rejectFriendError(error));
      });
  };
};
