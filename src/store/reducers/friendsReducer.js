import * as actionTypes from "../actions/actionTypes";

const prevState = {
  loading: false,
  data: [],
  error: null,
  loadingSearch: false,
  errorSearch: null,
  searchResult: [],
};

const friendsReducer = (state = prevState, action) => {
  switch (action.type) {
    case actionTypes.GET_FRIENDS_START:
      return { ...state, loading: true };

    case actionTypes.GET_FRIENDS_SUCCESS: {
      return { ...state, loading: false, data: action.data };
    }

    case actionTypes.GET_FRIENDS_ERROR: {
      return { ...state, loading: false, error: action.error };
    }

    case actionTypes.SEARCH_FRIENDS_START: {
      return { ...state, loadingSearch: true };
    }

    case actionTypes.SEARCH_FRIENDS_SUCCESS: {
      return {
        ...state,
        loadingSearch: false,
        searchResult: action.searchResult,
      };
    }

    case actionTypes.SEARCH_FRIENDS_ERROR:
      return {
        ...state,
        loadingSearch: false,
        errorSearch: action.errorSearch,
      };

    case actionTypes.ADD_FRIEND_START:
      return { ...state, loading: true };

    case actionTypes.ADD_FRIEND_SUCCESS:
      return { ...state, loading: false };

    case actionTypes.ADD_FRIEND_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default friendsReducer;
