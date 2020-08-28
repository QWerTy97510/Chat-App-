import * as actionTypes from "../actions/actionTypes";

const prevState = {
  loading: false,
  data: [],
  error: null,
};

const friendRequestsReducer = (state = prevState, action) => {
  switch (action.type) {
    case actionTypes.GET_FRIEND_REQUESTS_START:
      return { ...state, loading: true };

    case actionTypes.GET_FRIEND_REQUESTS_SUCCESS:
      return { ...state, loading: false, data: action.data, error: null };

    case actionTypes.GET_FRIEND_REQUESTS_ERROR:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default friendRequestsReducer;
