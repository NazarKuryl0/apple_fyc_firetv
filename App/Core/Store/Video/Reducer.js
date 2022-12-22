import {
  FETCH_VIDEO_DATA_SUCCESS,
  FETCH_VIDEO_DATA_FAILED,
  CLEAR_FETCH_VIDEO_DATA_ERROR_MESSAGE,
} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEO_DATA_SUCCESS:
      return {
        ...state,
        videoData: action.payload,
        fetchVideoDataErrorMessage: null,
      };
    case FETCH_VIDEO_DATA_FAILED:
      return {
        ...state,
        videoData: null,
        fetchVideoDataErrorMessage: action.payload,
      };
    case CLEAR_FETCH_VIDEO_DATA_ERROR_MESSAGE:
      return {
        ...state,
        fetchVideoDataErrorMessage: null,
      };
    default:
      return state;
  }
};

export {reducer};
