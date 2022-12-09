import {
  CHANGE_CLIENT_ENV_SUCCESS,
  CHANGE_CLIENT_REFERER_SUCCESS,
  CLEAR_CLIENT_DATA,
} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CLIENT_ENV_SUCCESS:
      return {
        ...state,
        env: action.payload.env,
        baseURL: action.payload.baseURL,
        referer: action.payload.referer,
      };
    case CHANGE_CLIENT_REFERER_SUCCESS:
      return {
        ...state,
        referer: action.payload.referer,
        baseURL: action.payload.baseURL,
        isFYCContent: action.payload.isFYCContent,
      };
    case CLEAR_CLIENT_DATA:
      return initialState;
    default:
      return state;
  }
};

export {reducer};
