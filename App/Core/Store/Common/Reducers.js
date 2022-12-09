import {SHOW_LOADER, HIDE_LOADER, RESET_LOADER} from './Actions';
import {initialState} from './InitialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loader: state.loader + 1,
      };
    case HIDE_LOADER:
      return {
        ...state,
        loader: state.loader - 1,
      };
    case RESET_LOADER: {
      return {
        ...state,
        loader: 0,
      };
    }
    default:
      return state;
  }
};

export {reducer};
