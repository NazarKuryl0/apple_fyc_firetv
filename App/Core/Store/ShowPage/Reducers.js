import {FETCH_SHOW_DATA_SUCCESS, FETCH_SHOW_DATA_FAILED} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOW_DATA_SUCCESS:
      return {
        ...state,
        showData: action.payload,
        fetchHomePageDataError: null,
      };
    case FETCH_SHOW_DATA_FAILED:
      return {
        ...state,
        showData: null,
        fetchHomePageDataError: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
