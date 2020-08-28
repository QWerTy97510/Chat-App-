import * as actionTypes from "../actions/actionTypes";

const previousState = {
  loading: false,
  data: {},
  errorSignup: null,
  errorLogin: null,
  isLoggedin: false,
};

const authReducer = (state = previousState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SIGNUP_START:
      return { ...state, loading: true, errorSignup: null, errorLogin: null };

    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        errorSignup: null,
      };

    case actionTypes.AUTH_SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        errorSignup: action.err,
        signingUp: true,
      };

    case actionTypes.AUTH_LOGIN_START: {
      return { ...state, loading: true };
    }
    case actionTypes.AUTH_LOGIN_SUCCESS: {
      return { ...state, data: action.data, loading: false, isLoggedin: true };
    }
    case actionTypes.AUTH_LOGIN_ERROR: {
      return {
        ...state,
        login: false,
        errorLogin: action.err,
        loading: false,
        isLoggedin: false,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
