import {
  FETCH_SHOW_DATA_SUCCESS,
  FETCH_SHOW_DATA_FAILED,
  FETCH_SHOW_EPISODES_DATA_FAILED,
  FETCH_SHOW_EPISODES_DATA_SUCCESS,
  SET_SHOW_BANNER,
  RESET_SHOW_BANNER,
} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOW_DATA_SUCCESS:
      return {
        ...state,
        showData: action.payload,
        fetchShowError: null,
        fetchShowEpisodesError: null,
      };
    case FETCH_SHOW_DATA_FAILED:
      return {
        ...state,
        showData: null,
        fetchShowError: action.payload,
        fetchShowEpisodesError: null,
        showBanner: null,
        showEpisodes: null,
      };
    case FETCH_SHOW_EPISODES_DATA_FAILED:
      return {
        ...state,
        fetchShowEpisodesError: action.payload,
        showEpisodes: null,
      };
    case FETCH_SHOW_EPISODES_DATA_SUCCESS:
      return {
        ...state,
        fetchShowEpisodesError: null,
        showEpisodes: action.payload,
      };
    case SET_SHOW_BANNER:
      return {
        ...state,
        showBanner: action.payload,
      };
    case RESET_SHOW_BANNER:
      return {
        ...state,
        showBanner: null,
      };
    default:
      return state;
  }
};

export {reducer};
