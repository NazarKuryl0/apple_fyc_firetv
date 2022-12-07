import {
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  CLEAR_FETCH_FYC_USER_ERROR_MESSAGE,
  CLEAR_USER_DATA,
} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        fetchUserErrorMessage: action.payload,
      };
    case CLEAR_FETCH_FYC_USER_ERROR_MESSAGE:
      return {
        ...state,
        fetchUserErrorMessage: null,
      };
    case CLEAR_USER_DATA:
      return {
        ...state,
        fetchUserErrorMessage: null,
        token: null,
      };
    default:
      return state;
  }
};

export {reducer};
