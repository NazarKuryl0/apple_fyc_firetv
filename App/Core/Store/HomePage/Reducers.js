import {
  FETCH_HOME_PAGE_DATA_SUCCESS,
  FETCH_HOME_PAGE_DATA_FAILED,
  CLEAR_HOME_PAGE_DATA,
} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOME_PAGE_DATA_SUCCESS:
      return {
        ...state,
        content: action.payload.dataToDisplayWithIndexing,
        contentWithGenres: action.payload.dataToDisplayWithGenres,
        fetchHomePageDataError: null,
      };
    case FETCH_HOME_PAGE_DATA_FAILED:
      return {
        ...state,
        content: null,
        contentWithGenres: null,
        fetchHomePageDataError: action.payload,
      };
    case CLEAR_HOME_PAGE_DATA:
      return initialState;

    default:
      return state;
  }
};

export {reducer};
